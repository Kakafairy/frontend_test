"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  SwatchBook,
  WandSparkles,
  BarChart3,
  Image as ImageIcon,
  AppWindowMac,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  SwatchBook,
  WandSparkles,
  BarChart3,
  Image: ImageIcon,
  AppWindowMac,
} as const;

type IconName = keyof typeof ICON_MAP;

interface InnovationData {
  icon: IconName;
  title: string;
  bg_color: string;
  txt_color: string;
}

function Innovation() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [innovationList, setinnovationList] = useState<InnovationData[] | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setinnovationList(data?.innovationList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const bottomAnimation = (index: number) => ({
    initial: { y: "25%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "25%", opacity: 0 },
    transition: { duration: 0.3, delay: 0.3 + index * 0.3 },
  });
  return (
    <section id="services">
      <div ref={ref} className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col justify-center items-center gap-10 lg:gap-16">
              <motion.div
                {...bottomAnimation(1)}
                className="max-w-(--breakpoint-Xsm) text-center"
              >
                <h2>
                  <TextGenerateEffect
                    words="Where innovation meets"
                    delay={0.4}
                  />
                  <TextGenerateEffect
                    words="aesthetics"
                    delay={1}
                    className="font-instrument-serif italic font-normal"
                  />
                </h2>
              </motion.div>
              <div ref={ref} className="w-full">
                <div className="grid auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
                  {innovationList?.map((items, index) => {
                    const IconComponent = ICON_MAP[items.icon];
                    return (
                      <motion.div
                        key={index}
                        initial={{
                          scale: 1.2,
                          opacity: 0,
                          filter: "blur(8px)",
                        }}
                        animate={
                          inView
                            ? { scale: 1, opacity: 1, filter: "blur(0px)" }
                            : {}
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + index * 0.2,
                          ease: "easeInOut",
                        }}
                        className="h-full"
                      >
                        <Card
                          className={cn(
                            "border-none shadow-none ring-0 flex h-full flex-col p-8 rounded-2xl gap-8",
                            items.bg_color,
                          )}
                        >
                          <CardContent className="p-0 flex flex-col h-full gap-8">
                            <div className="flex shrink-0">
                              {IconComponent && (
                                <IconComponent
                                  size={40}
                                  className={items.txt_color}
                                  strokeWidth={1}
                                />
                              )}
                            </div>
                            <div className="mt-auto">
                              <h3
                                className={cn(
                                  "text-2xl leading-tight",
                                  items.txt_color,
                                )}
                              >
                                {items.title.split("\n")?.map((line, i) => (
                                  <React.Fragment key={i}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                              </h3>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:flex xl:flex-row bg-black items-center justify-between dark:bg-white/5 py-8 px-7 sm:px-12 rounded-3xl w-full">
              <h4 className="text-white text-center xl:text-left">
                See Our Work in Action.
                <br /> Start Your Creative Journey with Us!
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Button
                  className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden bg-white hover:bg-white"
                  nativeButton={false}
                  render={<Link href="/contact" />}
                >
                  <span className="relative z-10 transition-all duration-500 text-black">
                    Let’s Collaborate
                  </span>
                  <div className="absolute right-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </Button>
                {/*  */}
                <Button
                  className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden bg-transparent hover:bg-transparent border border-white"
                  nativeButton={false}
                  render={<Link href="/#work" />}
                >
                  <span className="relative z-10 transition-all duration-500 text-white">
                    Get Started
                  </span>
                  <div className="absolute right-1 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Innovation;
