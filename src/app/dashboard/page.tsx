"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { StitchHeader } from "@/components/stitch-header";
import { RecommendationPrefsModal } from "@/components/recommendation-prefs-modal";
import { useAuth } from "@/lib/auth-context";
import { getOnboardingEntryRoute } from "@/lib/auth-routing";
import {
  listQuickMatchHistory,
  type QuickMatchMemberHistoryItem,
} from "@/lib/api-quick-match";
import {
  fetchRecommendations,
  dismissRecommendation,
  refreshRecommendations,
  type RecommendedJobItem,
  type RecommendedJobListResponse,
} from "@/lib/api-recommendations";
import { submitJobImport } from "@/lib/api-jobs";
import { listCvs, type CvDocumentListItem } from "@/lib/api-cv-make";

/* ── Premium lock icon + CTA tooltip ── */
function PremiumLockButton({
  children,
  isPremium,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  isPremium: boolean;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}) {
  if (isPremium) {
    return (
      <button type="button" onClick={onClick} disabled={disabled} className={className}>
        {children}
      </button>
    );
  }
  return (
    <div className="group/lock relative">
      <button
        type="button"
        disabled
        className={[
          className,
          "cursor-not-allowed opacity-60",
        ].join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mr-1.5 inline-block h-3.5 w-3.5"
        >
          <path
            fillRule="evenodd"
            d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
            clipRule="evenodd"
          />
        </svg>
        {children}
      </button>
      {/* CTA tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 w-56 -translate-x-1/2 rounded-2xl bg-on-surface px-4 py-3 text-center opacity-0 shadow-xl transition-opacity group-hover/lock:opacity-100">
        <p className="text-xs font-bold text-white">Unlock your full potential</p>
        <p className="mt-1 text-[0.65rem] leading-snug text-white/70">
          Upgrade to Premium to access personalized job recommendations and settings.
        </p>
        <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-on-surface" />
      </div>
    </div>
  );
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return "Not scored yet";
  }
  return new Date(value).toLocaleString();
}

function buildScoreTone(score: number | null): string {
  if (score == null) {
    return "bg-surface-container text-on-surface";
  }
  if (score >= 80) {
    return "bg-emerald-100 text-emerald-900";
  }
  if (score >= 60) {
    return "bg-amber-100 text-amber-900";
  }
  return "bg-rose-100 text-rose-900";
}

function buildCompactMeta(item: QuickMatchMemberHistoryItem): string {
  return [item.location_text, item.seniority, item.work_model]
    .filter(Boolean)
    .join(" • ");
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [quickMatchHistory, setQuickMatchHistory] = useState<QuickMatchMemberHistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");

  const [recommendations, setRecommendations] = useState<RecommendedJobItem[]>([]);
  const [recsStatus, setRecsStatus] = useState<RecommendedJobListResponse["status"]>("empty");
  const [recsLoading, setRecsLoading] = useState(true);
  const [recsError, setRecsError] = useState("");

  // Import URL state
  const [importUrl, setImportUrl] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");
  const [showImportInput, setShowImportInput] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [myCvs, setMyCvs] = useState<CvDocumentListItem[]>([]);
  const [myCvsLoading, setMyCvsLoading] = useState(true);

  const isPremium = user?.user?.plan_tier !== "free";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    const onboardingCompleted = Boolean(
      user?.onboarding?.profile_review_completed ||
      user?.onboarding?.completed_at ||
      user?.onboarding?.current_step === "completed",
    );
    if (!loading && user && !onboardingCompleted) {
      router.push(getOnboardingEntryRoute(user));
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setHistoryLoading(true);
    listQuickMatchHistory(6)
      .then((items) => {
        setQuickMatchHistory(items);
        setHistoryError("");
      })
      .catch((error: unknown) => {
        setHistoryError(error instanceof Error ? error.message : "Quick Match history could not be loaded.");
      })
      .finally(() => {
        setHistoryLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    setRecsLoading(true);
    fetchRecommendations()
      .then((res) => {
        setRecommendations(res.items);
        setRecsStatus(res.status);
        setRecsError("");
      })
      .catch((error: unknown) => {
        setRecsError(error instanceof Error ? error.message : "Recommendations could not be loaded.");
      })
      .finally(() => {
        setRecsLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    listCvs()
      .then((items) => setMyCvs(items.slice(0, 3)))
      .catch(() => {})
      .finally(() => setMyCvsLoading(false));
  }, [user]);

  function handleDismiss(id: string) {
    setRecommendations((prev) => prev.filter((r) => r.id !== id));
    dismissRecommendation(id).catch(() => {
      // Re-fetch on failure to restore correct state
      fetchRecommendations()
        .then((res) => {
          setRecommendations(res.items);
          setRecsStatus(res.status);
        })
        .catch(() => {});
    });
  }

  function handleImportSubmit() {
    if (!importUrl.trim()) return;
    setImportLoading(true);
    setImportError("");
    submitJobImport(importUrl.trim())
      .then(() => {
        setImportUrl("");
        setShowImportInput(false);
        // Refresh recommendations to pick up the new import
        fetchRecommendations()
          .then((res) => {
            setRecommendations(res.items);
            setRecsStatus(res.status);
          })
          .catch(() => {});
      })
      .catch((err: unknown) => {
        setImportError(err instanceof Error ? err.message : "Import failed.");
      })
      .finally(() => setImportLoading(false));
  }

  function handleRefresh() {
    if (!isPremium) return;
    setRecsLoading(true);
    refreshRecommendations()
      .then(() => {
        // Poll after a short delay to let the background task start
        setTimeout(() => {
          fetchRecommendations()
            .then((res) => {
              setRecommendations(res.items);
              setRecsStatus(res.status);
              setRecsError("");
            })
            .catch(() => {})
            .finally(() => setRecsLoading(false));
        }, 2000);
      })
      .catch((err: unknown) => {
        setRecsError(err instanceof Error ? err.message : "Refresh failed.");
        setRecsLoading(false);
      });
  }

  if (loading) {
    return (
      <>
        <StitchHeader />
        <main className="mx-auto w-[70%] max-w-none pb-20 pt-24">
          <div className="animate-pulse">
            {/* Header row */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="h-9 w-44 rounded-lg bg-slate-200" />
                <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
              </div>
              <div className="flex flex-wrap justify-end gap-2.5">
                {["w-36", "w-32", "w-24", "w-24", "w-20"].map((w) => (
                  <div key={w} className={`h-10 rounded-2xl bg-slate-200 ${w}`} />
                ))}
              </div>
            </div>
            {/* Main card */}
            <div className="rounded-[28px] border border-outline-variant/40 bg-white/90 p-6 sm:p-8">
              <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                {/* Left: QM history */}
                <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-6 space-y-4">
                  <div className="h-2.5 w-24 rounded bg-slate-200" />
                  <div className="h-7 w-56 rounded-lg bg-slate-200" />
                  <div className="h-3 w-full max-w-lg rounded bg-slate-200" />
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-[24px] border border-outline-variant/30 bg-white p-5 space-y-3">
                      <div className="flex justify-between gap-3">
                        <div className="space-y-1.5">
                          <div className="h-4 w-48 rounded bg-slate-200" />
                          <div className="h-3 w-32 rounded bg-slate-200" />
                        </div>
                        <div className="h-14 w-16 shrink-0 rounded-[20px] bg-slate-200" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-slate-200" />
                        <div className="h-6 w-16 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Right: shortcuts */}
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-[22px] border border-outline-variant/30 bg-slate-50 p-5 space-y-3">
                      <div className="h-2 w-16 rounded-full bg-slate-200" />
                      <div className="h-4 w-24 rounded bg-slate-200" />
                      <div className="h-3 w-full max-w-xs rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <StitchHeader />
      <main className="mx-auto w-[70%] max-w-none pb-20 pt-24">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="m-0 text-3xl font-extrabold tracking-tight text-on-surface">
              Dashboard
            </h1>
            <p className="mt-2 max-w-[720px] text-sm leading-relaxed text-on-surface-variant">
              Your Quick Match history now lives here alongside the member workspace shortcuts for profile, job import, and CV Tailor.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2.5">
            <button
              onClick={() => router.push("/quick-match")}
              className="rounded-2xl border-0 bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_62%,#60a5fa_100%)] px-4 py-3 text-sm font-extrabold text-white shadow-xl"
            >
              Open Quick Match
            </button>
            <button
              onClick={() => router.push("/my-profile")}
              className="rounded-2xl border-0 bg-on-surface px-4 py-3 text-sm font-semibold text-on-primary"
            >
              Open My Profile
            </button>
            <button
              onClick={() => router.push("/import-job")}
              className="rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-semibold text-on-surface"
            >
              Import Job
            </button>
            <button
              onClick={() => router.push("/cv-tailor")}
              className="rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-semibold text-on-surface"
            >
              CV Tailor
            </button>
            <button
              onClick={() => router.push("/cv-make")}
              className="rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-semibold text-on-surface"
            >
              CV Make
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface-variant"
            >
              Log out
            </button>
          </div>
        </div>

        {/* ═══ Jobs — Glass Frame ═══ */}
        <section className="mb-6 rounded-[2rem] bg-white/5 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.10),0_4px_14px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl sm:p-8">
          {/* Header — stays in glass area */}
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="block text-[0.68rem] font-black uppercase tracking-[0.22em] text-primary">
                Jobs
              </span>
              <h2 className="mt-2 font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                Recommended for You
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                Jobs matched from your profile data. Click any row to see full details.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <PremiumLockButton
                isPremium={isPremium}
                onClick={() => setPrefsOpen(true)}
                className="rounded-2xl border border-outline-variant bg-white px-4 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1.5 inline-block h-3.5 w-3.5">
                  <path fillRule="evenodd" d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
                Settings
              </PremiumLockButton>
              <PremiumLockButton
                isPremium={isPremium}
                onClick={handleRefresh}
                disabled={recsLoading}
                className="rounded-2xl border border-outline-variant bg-white px-4 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container disabled:opacity-50"
              >
                Refresh
              </PremiumLockButton>
              <PremiumLockButton
                isPremium={isPremium}
                onClick={() => setShowImportInput((v) => !v)}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-button transition-colors hover:bg-primary/90"
              >
                + New
              </PremiumLockButton>
            </div>
          </div>

          {/* White content canvas */}
          <div className="rounded-[1.5rem] border border-outline-variant/30 bg-white p-5 sm:p-6">
            {/* Import URL inline form */}
            {showImportInput && isPremium && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <input
                  type="url"
                  placeholder="Paste a job listing URL…"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleImportSubmit()}
                  className="min-w-0 flex-1 rounded-xl border border-outline-variant bg-white px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={handleImportSubmit}
                  disabled={importLoading || !importUrl.trim()}
                  className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary shadow-button disabled:opacity-50"
                >
                  {importLoading ? "Importing…" : "Import"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImportInput(false);
                    setImportUrl("");
                    setImportError("");
                  }}
                  className="shrink-0 rounded-xl px-3 py-2.5 text-sm font-semibold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
              </div>
            )}
            {importError && (
              <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900">
                {importError}
              </div>
            )}

            {/* Table body */}
            {recsLoading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 rounded-2xl bg-surface-container-lowest/70 p-4">
                    <div className="h-4 w-1/3 rounded bg-slate-200" />
                    <div className="h-4 w-1/5 rounded bg-slate-200" />
                    <div className="h-4 w-1/6 rounded bg-slate-200" />
                    <div className="h-4 w-1/6 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            ) : recsError ? (
              <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900">
                {recsError}
              </div>
            ) : recsStatus === "pending" ? (
              <div className="rounded-[22px] border border-dashed border-primary/30 bg-primary/5 p-5 text-sm text-on-surface-variant">
                <span className="mr-2 inline-block h-3 w-3 animate-pulse rounded-full bg-primary" />
                Your recommendations are being prepared. This page will update automatically.
              </div>
            ) : recommendations.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-outline-variant/40">
                {/* Table header */}
                <div className="hidden items-center gap-4 border-b border-outline-variant/30 bg-surface-container-lowest/70 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant sm:flex">
                  <span className="flex-[2]">Title</span>
                  <span className="flex-[1.5]">Company</span>
                  <span className="flex-1">Location</span>
                  <span className="flex-1">Seniority</span>
                  <span className="flex-1">Work Model</span>
                  <span className="w-20 text-right">Actions</span>
                </div>
                {/* Table rows */}
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="group flex cursor-pointer flex-col gap-2 border-b border-outline-variant/20 px-5 py-4 transition-colors last:border-b-0 hover:bg-primary/5 sm:flex-row sm:items-center sm:gap-4"
                    onClick={() => router.push(`/jobs/${rec.job_id}`)}
                  >
                    <div className="flex-[2] min-w-0">
                      <span className="block truncate text-sm font-bold text-on-surface group-hover:text-primary">
                        {rec.title || "Untitled role"}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-on-surface-variant sm:hidden">
                        {rec.company_name || "—"}
                      </span>
                    </div>
                    <span className="hidden flex-[1.5] truncate text-sm text-on-surface-variant sm:block">
                      {rec.company_name || "—"}
                    </span>
                    <span className="hidden flex-1 truncate text-sm text-on-surface-variant sm:block">
                      {rec.location_text || "—"}
                    </span>
                    <span className="hidden flex-1 sm:block">
                      {rec.seniority ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {rec.seniority}
                        </span>
                      ) : (
                        <span className="text-sm text-on-surface-variant">—</span>
                      )}
                    </span>
                    <span className="hidden flex-1 truncate text-sm text-on-surface-variant sm:block">
                      {rec.work_model || "—"}
                    </span>
                    <span className="flex w-20 justify-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(rec.id);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface-variant/60 opacity-0 transition-opacity hover:bg-surface-container hover:text-on-surface group-hover:opacity-100"
                        aria-label={`Dismiss ${rec.title || "recommendation"}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            ) : recsStatus === "empty" ? (
              <div className="rounded-[22px] border border-dashed border-outline-variant/60 bg-surface-container-low/50 p-5 text-sm text-on-surface-variant">
                No recommended jobs yet. Complete your onboarding to receive personalised recommendations.
              </div>
            ) : (
              <div className="rounded-[22px] border border-dashed border-outline-variant/60 bg-surface-container-low/50 p-5 text-sm text-on-surface-variant">
                All recommendations dismissed. {isPremium && "Click Refresh to get a new batch."}
              </div>
            )}
          </div>
        </section>

        {/* ═══ Quick Match — Glass Frame ═══ */}
        <section className="rounded-[2rem] bg-white/5 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.10),0_4px_14px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl sm:p-8">
          {/* Header — stays in glass area */}
          <div className="mb-5">
            <span className="block text-[0.68rem] font-black uppercase tracking-[0.22em] text-primary">
              Quick Match
            </span>
            <h2 className="mt-2 font-headline text-2xl font-extrabold tracking-tight text-on-surface">
              Linked role-fit history
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
              Every linked Quick Match result stores the target role, company, score, and compact job snapshot so members can return to high-potential opportunities later.
            </p>
          </div>

          {/* White content canvas */}
          <div className="rounded-[1.5rem] border border-outline-variant/30 bg-white p-5 sm:p-6">
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              {/* Left — history cards */}
              <div className="space-y-4">
                {historyLoading ? (
                  <>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="animate-pulse rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest/60 p-5 space-y-3">
                        <div className="flex justify-between gap-3">
                          <div className="space-y-1.5">
                            <div className="h-4 w-48 rounded bg-slate-200" />
                            <div className="h-3 w-32 rounded bg-slate-200" />
                          </div>
                          <div className="h-14 w-16 shrink-0 rounded-[20px] bg-slate-200" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-6 w-20 rounded-full bg-slate-200" />
                          <div className="h-6 w-16 rounded-full bg-slate-200" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : historyError ? (
                  <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900">
                    {historyError}
                  </div>
                ) : quickMatchHistory.length > 0 ? (
                  quickMatchHistory.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => router.push(`/quick-match?submissionId=${item.id}`)}
                      className="grid w-full gap-4 rounded-[24px] border border-outline-variant/40 bg-surface-container-lowest/60 p-5 text-left transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-on-surface">
                            {item.job_title || "Untitled target role"}
                          </h3>
                          <p className="mt-1 text-sm text-on-surface-variant">
                            {item.job_company_name || "Company not identified"}
                          </p>
                        </div>
                        <div className={[
                          "rounded-[20px] px-4 py-3 text-center",
                          buildScoreTone(item.match_score),
                        ].join(" ")}>
                          <div className="text-[0.68rem] font-bold uppercase tracking-[0.16em]">
                            Match
                          </div>
                          <div className="mt-1 text-2xl font-black">{item.match_score ?? "--"}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
                        <span className="rounded-full bg-surface-container px-3 py-1">
                          {item.job_origin || "unknown origin"}
                        </span>
                        <span className="rounded-full bg-surface-container px-3 py-1">
                          {item.status}
                        </span>
                        {buildCompactMeta(item) ? (
                          <span className="rounded-full bg-surface-container px-3 py-1">
                            {buildCompactMeta(item)}
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs leading-relaxed text-on-surface-variant">
                        Scored {formatDateTime(item.scored_at)}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-[22px] border border-dashed border-outline-variant/60 bg-surface-container-low/50 p-5 text-sm text-on-surface-variant">
                    No linked Quick Match results yet. Run a public Quick Match and save the result to your account to start building this history.
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => router.push("/quick-match")}
                    className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-button"
                  >
                    Score another role
                  </button>
                  <button
                    onClick={() => router.push("/cv-tailor")}
                    className="rounded-2xl border border-outline-variant bg-white px-5 py-3 text-sm font-semibold text-on-surface"
                  >
                    Open CV Tailor
                  </button>
                </div>
              </div>

              {/* Right — shortcuts */}
              <div className="grid gap-4">
                {[
                  ["Profile", "Your full profile and source CV remain available under My Profile."],
                  ["Jobs", "Import or revisit roles that deserve a deeper application workflow."],
                  ["Tailoring", "Open CV Tailor when you want to turn a promising Match into targeted rewrite suggestions."],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-[22px] border border-outline-variant/40 bg-surface-container-lowest/70 p-5"
                  >
                    <div className="h-2 w-16 rounded-full bg-primary/20" />
                    <h3 className="mt-4 text-base font-bold text-on-surface">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ My CVs — Glass Frame ═══ */}
        <section className="mb-6 rounded-[2rem] bg-white/5 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.10),0_4px_14px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="block text-[0.68rem] font-black uppercase tracking-[0.22em] text-primary">
                CV Make
              </span>
              <h2 className="mt-2 font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                My CVs
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-on-surface-variant">
                Your most recent CVs. Create and customize professional CVs from your profile data.
              </p>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => router.push("/cv-make")}
                className="rounded-2xl border border-outline-variant bg-white px-4 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
              >
                View All
              </button>
              <button
                type="button"
                onClick={() => router.push("/cv-make")}
                className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-on-primary shadow-button transition-colors hover:bg-primary/90"
              >
                + Create CV
              </button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-outline-variant/30 bg-white p-5 sm:p-6">
            {myCvsLoading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4 rounded-2xl bg-surface-container-lowest/70 p-4">
                    <div className="h-4 w-1/3 rounded bg-slate-200" />
                    <div className="h-4 w-1/5 rounded bg-slate-200" />
                    <div className="h-4 w-1/6 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            ) : myCvs.length > 0 ? (
              <div className="space-y-3">
                {myCvs.map((cv) => (
                  <button
                    key={cv.id}
                    type="button"
                    onClick={() => router.push(`/cv-make/${cv.id}`)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/60 p-4 text-left transition-transform hover:-translate-y-0.5"
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-xl"
                      style={{ backgroundColor: cv.primary_color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-on-surface">
                        {cv.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-on-surface-variant">
                        {cv.template_id} · Updated {new Date(cv.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-semibold capitalize text-on-surface-variant">
                      {cv.template_id}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-dashed border-outline-variant/60 bg-surface-container-low/50 p-5 text-center text-sm text-on-surface-variant">
                No CVs yet. Create your first professional CV from your profile data.
              </div>
            )}
          </div>
        </section>

        {/* Reserved widget area */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Reserved for KPIs",
            "Reserved for recent activity",
            "Reserved for custom widgets",
          ].map((item) => (
            <div
              key={item}
              className="flex min-h-32 items-end rounded-[22px] border border-dashed border-outline-variant/60 bg-surface-container-lowest/40 p-5"
            >
              <span className="text-sm font-semibold text-on-surface-variant">{item}</span>
            </div>
          ))}
        </div>

        {/* Preferences modal */}
        <RecommendationPrefsModal
          open={prefsOpen}
          onClose={() => setPrefsOpen(false)}
          onSaved={() => {
            // Refresh recommendations after prefs change
            setRecsLoading(true);
            setTimeout(() => {
              fetchRecommendations()
                .then((res) => {
                  setRecommendations(res.items);
                  setRecsStatus(res.status);
                  setRecsError("");
                })
                .catch(() => {})
                .finally(() => setRecsLoading(false));
            }, 2000);
          }}
        />
      </main>
    </>
  );
}