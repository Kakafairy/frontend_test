"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Faq() {
  const [faqList, setfaqList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setfaqList(data?.faqList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="flex flex-col gap-10 md:gap-20">
            <div className="max-w-md text-center mx-auto">
              <h2>
                <TextGenerateEffect words="Got questions? We’ve got" />
                <TextGenerateEffect
                  words="answers"
                  delay={1}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>
            <div className="flex flex-col">
              <Accordion className="w-full flex flex-col gap-6">
                {faqList?.map((item: any, index: any) => (
                  <AccordionItem
                    key={`item-${index}`}
                    value={`item-${index}`}
                    className={cn(
                      "p-6 border border-border rounded-2xl flex flex-col gap-3 ",
                    )}
                  >
                    <AccordionTrigger className="p-0 text-xl font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                      <h4 className="text-foreground">{item.faq_que}</h4>
                      <PlusIcon className="w-6 h-6 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                    </AccordionTrigger>
                    <AccordionContent className="p-0 text-muted-foreground text-base">
                      <p className="text-base font-normal text-muted-foreground">
                        {item.faq_ans}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
