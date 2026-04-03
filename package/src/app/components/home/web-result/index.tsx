"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { WandSparkles, Zap, Target } from "lucide-react";

const ICON_MAP = {
  WandSparkles,
  Zap,
  Target,
} as const;

type IconName = keyof typeof ICON_MAP;

interface AboutUsData {
  icon: IconName;
  title: string;
  color: string;
}

interface Statistics {
  title: string;
  count: number;
}

function WebResult() {
  const [data, setData] = useState<AboutUsData[] | null>(null);
  const [stats, setStats] = useState<Statistics[] | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");

        const responseData = await res.json();
        setData(responseData?.WebResultTagList);
        setStats(responseData?.statisticsCounter);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="aboutus">
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col lg:gap-16 gap-5">
            <div className="flex flex-col items-center justify-center text-center gap-5">
              <h2 className="max-w-6xl">
                <TextGenerateEffect
                  words="Crafting exceptional, well experienced & technology driven
                strategies to drive impactful results with"
                  duration={0.2}
                />
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
                {data?.map((item, index) => {
                  const IconComponent = ICON_MAP[item.icon];
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 py-2 px-6 rounded-full ${item.color}`}
                    >
                      {IconComponent && (
                        <IconComponent
                          className="size-6 sm:size-8 lg:size-10 shrink-0"
                          strokeWidth={1.5}
                        />
                      )}
                      <span className="text-4xl font-instrument-serif italic font-normal">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-col md:flex md:flex-row justify-center items-center text-center">
              {stats?.map((item, index) => (
                <div
                  key={index}
                  className="relative 2xl:px-24 px-16 md:py-8 py-4"
                >
                  <h2
                    ref={index === 0 ? ref : null}
                    className="2xl:text-9xl md:text-7xl text-5xl"
                  >
                    <sup>+</sup>
                    {inView ? (
                      <CountUp start={0} end={item.count} duration={3} />
                    ) : (
                      "0"
                    )}
                  </h2>
                  <p
                    className={`mt-2 ${index !== 0 ? "text-muted-foreground" : ""}`}
                  >
                    {item.title}
                  </p>
                  {index !== stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-28 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WebResult;
