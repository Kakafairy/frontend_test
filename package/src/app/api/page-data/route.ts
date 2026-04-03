import { NextResponse } from "next/server";

const avatarList = [
  {
    image: "/images/home/avatar_1.jpg",
    title: "Sarah Johnson",
  },
  {
    image: "/images/home/avatar_2.jpg",
    title: "Olivia Miller",
  },
  {
    image: "/images/home/avatar_3.jpg",
    title: "Sophia Roberts",
  },
  {
    image: "/images/home/avatar_4.jpg",
    title: "Isabella Clark",
  },
];

const brandList = [
  {
    image: "/images/home/brand/brand-icon-1.svg",
    darkImg: "/images/home/brand/brand-darkicon-1.svg",
    title: "Adobe",
  },
  {
    image: "/images/home/brand/brand-icon-2.svg",
    darkImg: "/images/home/brand/brand-darkicon-2.svg",
    title: "Figma",
  },
  {
    image: "/images/home/brand/brand-icon-3.svg",
    darkImg: "/images/home/brand/brand-darkicon-3.svg",
    title: "Shopify",
  },
  {
    image: "/images/home/brand/brand-icon-4.svg",
    darkImg: "/images/home/brand/brand-darkicon-4.svg",
    title: "Dribble",
  },
  {
    image: "/images/home/brand/brand-icon-5.svg",
    darkImg: "/images/home/brand/brand-darkicon-5.svg",
    title: "Webflow",
  },
];

const innovationList = [
  {
    icon: "SwatchBook",
    title: "Brand\nStrategy",
    bg_color: "bg-purple-500/10",
    txt_color: "text-purple-500",
  },
  {
    icon: "Image",
    title: "Digital\nMarketing",
    bg_color: "bg-sky-400/10",
    txt_color: "text-sky-400",
  },
  {
    icon: "WandSparkles",
    title: "UI/UX\nDesign",
    bg_color: "bg-orange-400/10",
    txt_color: "text-orange-400",
  },
  {
    icon: "BarChart3",
    title: "Analytics &\nReporting",
    bg_color: "bg-lime-400/10",
    txt_color: "text-lime-400",
  },
  {
    icon: "AppWindowMac",
    title: "Web\nDevelopment",
    bg_color: "bg-red-500/10",
    txt_color: "text-red-500",
  },
];

const onlinePresenceList = [
  {
    image: "/images/home/onlinePresence/online_img_1.jpg",
    title: "FlowBank",
    tag: ["UX Research", "Interface Design"],
    link: "https://www.wrappixel.com/",
  },
  {
    image: "/images/home/onlinePresence/online_img_2.jpg",
    title: "Academy.co",
    tag: ["Product Design", "Interaction Design"],
    link: "https://www.wrappixel.com/",
  },
  {
    image: "/images/home/onlinePresence/online_img_3.jpg",
    title: "Genome",
    tag: ["Brand identity design", "UX Research"],
    link: "https://www.wrappixel.com/",
  },
  {
    image: "/images/home/onlinePresence/online_img_4.jpg",
    title: "Hotto",
    tag: ["Visual Storytelling", "Web & Mobile Design"],
    link: "https://www.wrappixel.com/",
  },
];

const creativeMindList = [
  {
    image: "/images/home/creative/creative_img_1.png",
    name: "Logan Dang",
    position: "WordPress Developer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_2.png",
    name: "Ana Belić",
    position: "Social Media Specialist",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_3.png",
    name: "Brian Hanley",
    position: "Product Designer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
  {
    image: "/images/home/creative/creative_img_4.png",
    name: "Darko Stanković",
    position: "UI Designer",
    twitterLink: "https://x.com/",
    linkedinLink: "https://in.linkedin.com/",
  },
];

const WebResultTagList = [
  {
    icon: "WandSparkles",
    title: "Creativity",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: "Zap",
    title: "Innovation",
    color: "bg-sky-400/10 text-sky-400",
  },
  {
    icon: "Target",
    title: "Strategy",
    color: "bg-orange-400/10 text-orange-400",
  },
];

const statisticsCounter = [
  {
    title: "Total Projects Completed",
    count: 40,
  },
  {
    title: "Years of Experience",
    count: 15,
  },
  {
    title: "Design Awards",
    count: 12,
  },
];

const startupPlanList = [
  {
    plan_bg_color: "bg-pale-yellow",
    text_color: "text-dark_black",
    descp_color: "dark_black/60",
    border_color: "bg-dark_black/10",
    plan_name: "Starter",
    plan_descp: "For companies who need design support. One request at a time",
    plan_price: "$2500",
    icon_img: "/images/home/startupPlan/white_tick.svg",
    plan_feature: [
      "Design Updates Every 2 Days",
      "Mid-level Designer",
      "SEO optimization",
      "Monthly analytics",
      "2x Calls Per Month",
      "License free assets",
    ],
  },
  {
    plan_bg_color: "bg-purple_blue",
    text_color: "text-white",
    descp_color: "white/60",
    border_color: "bg-white/10",
    plan_name: "Pro",
    plan_descp: "2x the speed. Great for an MVP, Web App or complex problem",
    plan_price: "$3800",
    icon_img: "/images/home/startupPlan/black_tick.svg",
    plan_feature: [
      "Design Updates Daily",
      "Senior-level Designer",
      "AI Advisory Framework",
      "Full-service Creative Team",
      "4x Calls Per Month",
      "License free assets",
    ],
  },
];

const faqList = [
  {
    faq_que: "What services does Awake Agency offer?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How long does a typical project take?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How is pricing structured at Awake Agency?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "Do you offer ongoing support after project completion?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How often will I receive updates on my project?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
  {
    faq_que: "How often will I receive updates on my project?",
    faq_ans:
      "Yes, we provide post-launch support to ensure smooth implementation and offer ongoing maintenance packages for clients needing regular updates or technical assistance.",
  },
];

const achievementsList = [
  {
    icon: "/images/home/achievement/framer_award.svg",
    dark_icon: "/images/home/achievement/dark_framer_award.svg",
    sub_title: "Framer Awards",
    title:
      "Celebrated for cutting-edge interaction design and seamless user experiences.",
    year: "2024",
    url: "https://www.framer.com/@wrap-pixel/",
  },
  {
    icon: "/images/home/achievement/dribble_award.svg",
    dark_icon: "/images/home/achievement/dribble_award.svg",
    sub_title: "Dribbble Awards",
    title: "Recognized for creative excellence and innovative design solutions",
    year: "2023",
    url: "https://dribbble.com/wrappixel",
  },
  {
    icon: "/images/home/achievement/awward_award.svg",
    dark_icon: "/images/home/achievement/dark_awward_award.svg",
    sub_title: "awwwards Awards",
    title:
      "Honored with the Best Website Design for creativity, usability, and innovation.",
    year: "2022",
    url: "https://www.framer.com/@wrap-pixel/",
  },
];

export const GET = async () => {
  return NextResponse.json({
    avatarList,
    brandList,
    innovationList,
    onlinePresenceList,
    creativeMindList,
    WebResultTagList,
    statisticsCounter,
    startupPlanList,
    faqList,
    achievementsList,
  });
};
