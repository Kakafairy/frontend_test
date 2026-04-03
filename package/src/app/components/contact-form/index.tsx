"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "design & branding",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reset = () => {
    formData.name = "";
    formData.email = "";
    formData.interest = "design & branding";
    formData.budget = "";
    formData.message = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    fetch("https://formsubmit.co/ajax/bhainirav772@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        interest: formData.interest,
        budget: formData.budget,
        message: formData.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setSubmitted(data.success);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section>
      <div className="relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10 before:rounded-full before:top-24 before:blur-3xl  before:-z-10">
        <div className="container relative z-10">
          <div className="flex flex-col gap-10 md:gap-20">
            <div className="relative flex flex-col text-center items-center">
              <h2 className="font-medium w-full max-w-32">
                <TextGenerateEffect
                  words="Love to hear from you, Get in"
                  duration={0.5}
                />
                <TextGenerateEffect
                  words="touch"
                  delay={1.5}
                  className="italic font-normal instrument-font"
                />
              </h2>
            </div>
            {submitted ? (
              <div className="flex flex-col items-center gap-5 text-center max-w-xl mx-auto p-6 rounded-lg bg-green/20 dark:bg-white/5">
                <div className="flex">
                  <Icon
                    icon="ix:success-filled"
                    width="30"
                    height="30"
                    style={{ color: "#79D45E" }}
                  />
                  <h5 className="text-green dark:text-green">
                    Great!!! Email has been Successfully Sent. We will get in
                    touch asap.
                  </h5>
                </div>

                <Link
                  href="/"
                  className="group w-fit text-black font-medium bg-transparent dark:bg-white/20 dark:hover:bg-white rounded-full flex items-center gap-4 py-2 pl-5 pr-2 hover:bg-transparent border border-dark_black"
                >
                  <span className="group-hover:translate-x-9 group-hover:dark:text-dark_black dark:text-white transform transition-transform duration-200 ease-in-out">
                    Back to home
                  </span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:-translate-x-[125px] transition-all duration-200 ease-in-out group-hover:rotate-45"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="white"
                      className=" transition-colors duration-200 ease-in-out fill-black"
                    />
                    <path
                      d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                      stroke="#1B1D1E"
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className=" transition-colors duration-200 ease-in-out stroke-white"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-white dark:bg-dark_black rounded-2xl p-8 gap-8"
              >
                <div className="flex flex-col md:flex md:flex-row gap-6">
                  <div className="w-full">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      className="w-full mt-2 rounded-full border px-5 py-3 h-12 outline-hidden transition dark:border-white/20 focus:border-dark_black/50 dark:focus:border-white/50 dark:bg-black/40 focus-visible:ring-0 shadow-none"
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      className="w-full mt-2 rounded-full border px-5 py-3 h-12 outline-hidden transition dark:border-white/20 focus:border-dark_black/50 dark:focus:border-white/50 dark:bg-black/40 focus-visible:ring-0 shadow-none"
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex md:flex-row gap-6">
                  <div className="w-full">
                    <Label htmlFor="interest">
                      What are you interested in?
                    </Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => {
                        if (value) {
                          setFormData((prev) => ({ ...prev, interest: value }));
                        }
                      }}
                    >
                      <SelectTrigger className="w-full mt-2 text-base px-5 h-12! rounded-full border transition-all duration-500 dark:border-white/20 focus:outline-0 dark:bg-black/40 focus-visible:ring-0 shadow-none">
                        <SelectValue placeholder="Design & Branding" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design & branding">
                          Design & Branding
                        </SelectItem>
                        <SelectItem value="Ecommerce">Ecommerce</SelectItem>
                        <SelectItem value="Specialist">Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full h-full">
                    <Label htmlFor="budget">Project budget</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => {
                        if (value) {
                          setFormData((prev) => ({ ...prev, budget: value }));
                        }
                      }}
                    >
                      <SelectTrigger className="w-full mt-2 text-base px-5 py-3 h-12! rounded-full border transition-all duration-500 dark:text-white border-solid dark:border-white/20 focus:outline-0 dark:bg-black/40 focus-visible:ring-0 shadow-none">
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$10000">$10,000</SelectItem>
                        <SelectItem value="$50500">$50,500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    className="w-full mt-2 h-28 rounded-3xl border px-5 py-3 outline-hidden transition dark:border-white/20
                                        focus:border-dark_black/50 dark:focus:border-white/50 dark:bg-black/40 focus-visible:ring-0 shadow-none"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Let tell us know your project about"
                    rows={4}
                  />
                </div>
                <div>
                  {!loader ? (
                    <Button
                      type="submit"
                      className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden"
                    >
                      <span className="relative z-10 transition-all duration-500">
                        Let’s Collaborate
                      </span>
                      <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-grey item-center flex gap-2 py-3 px-7 rounded-sm h-12"
                    >
                      <div
                        className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>{" "}
                      Submitting
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
