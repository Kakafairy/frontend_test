"use client";
import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const useActiveLink = (setActiveLink: (link: string) => void) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateActiveLink = () => {
      const fullPath = window.location.hash
        ? `${pathname}${window.location.hash}`
        : pathname;
      setActiveLink(fullPath);
    };

    updateActiveLink();

    window.addEventListener("hashchange", updateActiveLink);

    return () => {
      window.removeEventListener("hashchange", updateActiveLink);
    };
  }, [pathname, searchParams, setActiveLink]);
};

const MobileHeaderContent: React.FC<{ item: any }> = ({ item }) => {
  const [activeLink, setActiveLink] = useState("");

  useActiveLink(setActiveLink);

  return (
    <Link
      href={item.href}
      className={`rounded-md text-base font-medium flex w-full transition-all duration-200
        ${
          activeLink === item.href
            ? "text-black bg-dark_black/5 dark:bg-white/10 dark:text-white"
            : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
        }`}
    >
      <li className={`rounded-md w-full p-2 px-4 list-none`}>{item.label}</li>
    </Link>
  );
};

const MobileHeader: React.FC<{ item: any }> = ({ item }) => (
  <Suspense fallback={null}>
    <MobileHeaderContent item={item} />
  </Suspense>
);

export default MobileHeader;
