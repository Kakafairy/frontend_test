"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import StarRating from "@/app/components/shared/star-rating";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplashCursor from "@/app/components/ui/splash-cursor";

function HeroSection() {
  const ref = useRef(null);
  const [avatarList, setAvatarList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const bottomAnimation = {
    initial: { y: "20%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section ref={ref} className="relative">
      <div className="absolute inset-0 -z-1 pointer-events-none">
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </div>
      <div className="relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
        <div className="container relative z-10">
          <div className="flex flex-col max-w-5xl mx-auto gap-8">
            <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
              <h1>
                <TextGenerateEffect words="Building bold brands with" />
                <TextGenerateEffect
                  words="thoughtful design"
                  delay={0.8}
                  className="font-instrument-serif italic tracking-tight"
                />
              </h1>
              <motion.p {...bottomAnimation} className="max-w-38">
                At Awake, we help small startups tackle the world’s biggest
                challenges with tailored solutions, guiding you from strategy to
                success in a competitive market.
              </motion.p>
            </div>
            <motion.div
              {...bottomAnimation}
              className="flex items-center flex-col md:flex-row justify-center gap-8"
            >
              <Button
                className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                <span className="relative z-10 transition-all duration-500">
                  Get Started
                </span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
              <div className="flex items-center sm:gap-7 gap-3">
                <ul className="avatar flex flex-row items-center">
                  {avatarList?.avatarList?.map((items: any, index: any) => (
                    <li key={index} className="-mr-2 z-1 avatar-hover:ml-2">
                      <Image
                        src={items.image}
                        alt="Image"
                        width={44}
                        height={44}
                        quality={100}
                        className="rounded-full border-2 border-white"
                      />
                    </li>
                  ))}
                </ul>
                {/* -------------- Star rating division --------------- */}
                <div className="gap-1 flex flex-col">
                  <div>
                    <StarRating count={4} color="#F59E0B" />
                  </div>
                  <p className="text-sm font-normal">
                    Trusted by 1000+ clients
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
