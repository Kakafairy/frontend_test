"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Subscription() {
  const [startupPlanList, setstartupPlanList] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setstartupPlanList(data?.startupPlanList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section id="pricing">
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col gap-10 md:gap-20">
            <div className="max-w-25 text-center mx-auto">
              <h2>
                <TextGenerateEffect words="Pick the plan that fits your" />
                <TextGenerateEffect
                  words="start-up"
                  delay={1.2}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>
            {/* Pricing Plans */}
            <div className="flex flex-col lg:flex-row items-center justify-center grow gap-6 w-full">
              {startupPlanList?.map((items: any, index: number) => (
                <Card
                  className={cn(
                    items.plan_bg_color,
                    "p-8 sm:p-10 rounded-2xl ring-0 w-full sm:w-fit",
                  )}
                  key={index}
                >
                  <CardContent className="flex flex-col sm:flex-row gap-6 md:gap-10 items-start self-stretch px-0 h-full w-full">
                    <div className="flex flex-col items-start justify-between self-stretch gap-6">
                      <div className="flex flex-col gap-3">
                        <Badge className="py-1 px-3 text-sm font-normal leading-5 w-fit h-7 bg-black text-white">
                          {items.plan_name}
                        </Badge>
                        <p className={`text-${items.descp_color} max-w-56`}>
                          {items.plan_descp}
                        </p>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h2
                          className={`${items.text_color} dark:${items.text_color}`}
                        >
                          {items.plan_price}
                          <span
                            className={`text-base text-${items.descp_color} ml-1`}
                          >
                            /month
                          </span>
                        </h2>
                        <Button
                          className="relative bg-white hover:bg-white hover:text-black dark:hover:text-black text-black text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
                          nativeButton={false}
                          render={<Link href="/contact" />}
                        >
                          <span className="relative z-10 transition-all duration-500">
                            Let's Collaborate
                          </span>
                          <div className="absolute right-1 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                            <ArrowUpRight size={16} />
                          </div>
                        </Button>
                      </div>
                    </div>
                    <Separator
                      orientation="vertical"
                      className={`hidden sm:block ${items.border_color}`}
                    />
                    <Separator
                      orientation="horizontal"
                      className={`sm:hidden block ${items.border_color}`}
                    />
                    <div className="flex flex-col items-start gap-3 grow">
                      <p className={`${items.text_color}`}>Features</p>
                      <ul className="flex flex-col items-start self-stretch gap-3">
                        {items.plan_feature?.map(
                          (feature: string, index: number) => {
                            return (
                              <li
                                key={index}
                                className={`flex items-center gap-3`}
                              >
                                <Check
                                  size={16}
                                  aria-hidden="true"
                                  className={`${items.text_color}`}
                                />
                                <p className={`${items.text_color}`}>
                                  {feature}
                                </p>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
