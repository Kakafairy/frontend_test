export const TypographyConfiguration = () => {
  return (
    <>
      <h3 className=" text-black text-xl font-semibold mt-8 dark:text-white">
        Typography (Tailwind v4)
      </h3>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-grey">
          1. Import & Setup Fonts :{" "}
          <span className="font-semibold text-base">src/app/layout.tsx</span>
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <div className="text-sm text-gray-400 font-mono leading-relaxed">
            <p>
              <span className="text-purple-400">import</span> &#123;{" "}
              <span className="text-blue-300">Inter_Tight</span> &#125;{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">"next/font/google"</span>;
            </p>
            <p className="mt-4">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">interTight</span> ={" "}
              <span className="text-yellow-200">Inter_Tight</span>(&#123;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">subsets</span>: [
              <span className="text-green-400">"latin"</span>],
            </p>
            <p className="ms-4">
              <span className="text-blue-200">variable</span>:{" "}
              <span className="text-green-400">"--font-inter-tight"</span>,
            </p>
            <p>&#125;);</p>
            <p className="mt-4">
              <span className="text-gray-500">&lt;</span>
              <span className="text-blue-400">html</span>{" "}
              <span className="text-blue-200">className</span>=
              <span className="text-yellow-200">
                &#123;interTight.variable&#125;
              </span>
              <span className="text-gray-500">&gt;</span>
            </p>
            <p className="ms-4">
              <span className="text-gray-500">&lt;</span>
              <span className="text-blue-400">body</span>{" "}
              <span className="text-blue-200">className</span>=
              <span className="text-green-400">"font-inter-tight"</span>
              <span className="text-gray-500">&gt;</span>...
              <span className="text-gray-500">&lt;/</span>
              <span className="text-blue-400">body</span>
              <span className="text-gray-500">&gt;</span>
            </p>
            <p>
              <span className="text-gray-500">&lt;/</span>
              <span className="text-blue-400">html</span>
              <span className="text-gray-500">&gt;</span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-grey">
          2. Register in Theme :{" "}
          <span className="font-semibold text-base">src/app/globals.css</span>
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <div className="text-sm text-gray-400 font-mono leading-relaxed">
            <p className="text-purple-400">@theme &#123;</p>
            <p className="ms-4">
              <span className="text-blue-200">--font-inter-tight</span>:{" "}
              <span className="text-yellow-200">var(--font-inter-tight)</span>;
            </p>
            <p className="text-purple-400">&#125;</p>
          </div>
        </div>
      </div>
    </>
  );
};
