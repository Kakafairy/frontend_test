"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

function Solutions() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const bottomAnimation = {
    initial: { y: "5%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section>
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div
            ref={ref}
            className="py-16 md:py-28 px-6 border border-dark_black/10 rounded-3xl bg-[linear-gradient(90deg,#CDEFFB_0%,#FFFFFF_33.23%,#FFFFFF_65.77%,#FDEECB_100%)] backdrop-blur-[200px] dark:opacity-80"
          >
            <motion.div
              {...bottomAnimation}
              className="flex flex-col gap-6 items-center md:max-w-3xl mx-auto"
            >
              <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="text-3xl md:text-5xl text-black">
                  <TextGenerateEffect words="Innovative solutions for" />
                  <TextGenerateEffect
                    words="bold brands"
                    delay={1}
                    className="font-instrument-serif italic font-normal text-black"
                  />
                </h2>
                <p className="dark:text-dark_black">
                  Looking to elevate your brand? We craft immersive experiences
                  that captivate, engage, and make your business unforgettable
                  in every interaction.
                </p>
              </div>
              <Button
                className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden bg-black hover:bg-black"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                <span className="relative z-10 transition-all duration-500 text-white">
                  Let’s Collaborate
                </span>
                <div className="absolute right-1 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
