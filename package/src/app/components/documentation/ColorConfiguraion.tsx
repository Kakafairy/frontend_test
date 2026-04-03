export const ColorConfiguration = () => {
  return (
    <>
      <h3 className=" text-black text-xl font-semibold mt-8 dark:text-white">
        Colors
      </h3>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-grey">
          <span className="font-semibold text-lg dark:text-white">
            1. Override Colors (Tailwind v4)
          </span>{" "}
          <br />
          For any change in colors, update the CSS variables in :{" "}
          <span className="font-semibold">src/app/globals.css</span>
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <div className="text-sm text-gray-400 font-mono leading-relaxed">
            <p className="text-purple-400">@theme &#123;</p>
            <p className="ms-4">
              <span className="text-blue-200">--color-dark_black</span>:{" "}
              <span className="text-yellow-200">#1b1d1e</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-purple_blue</span>:{" "}
              <span className="text-yellow-200">#4928fd</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-purple</span>:{" "}
              <span className="text-yellow-200">#ba81ee</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-blue</span>:{" "}
              <span className="text-yellow-200">#70b5ff</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-orange</span>:{" "}
              <span className="text-yellow-200">#ffaf68</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-green</span>:{" "}
              <span className="text-yellow-200">#79d45e</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--color-pink</span>:{" "}
              <span className="text-yellow-200">#f4889a</span>;
            </p>
            <p className="ms-4 mt-2 text-gray-500">/* ... gradients */</p>
            <p className="text-purple-400">&#125;</p>
          </div>
        </div>
      </div>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-grey">
          <span className="font-semibold text-lg dark:text-white">
            2. CSS Variables For Theming
          </span>{" "}
          <br />
          Theme-specific colors (light/dark) are managed via standard CSS
          variables in :{" "}
          <span className="font-semibold">src/app/globals.css</span>
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <div className="text-sm text-gray-400 font-mono leading-relaxed">
            <p className="text-blue-300">:root &#123;</p>
            <p className="ms-4">
              <span className="text-blue-200">--primary</span>:{" "}
              <span className="text-yellow-200">oklch(0.205 0 0)</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--background</span>:{" "}
              <span className="text-yellow-200">oklch(1 0 0)</span>;
            </p>
            <p className="text-blue-300">&#125;</p>
            <p className="text-blue-300 mt-2">.dark &#123;</p>
            <p className="ms-4">
              <span className="text-blue-200">--primary</span>:{" "}
              <span className="text-yellow-200">oklch(0.87 0.00 0)</span>;
            </p>
            <p className="ms-4">
              <span className="text-blue-200">--background</span>:{" "}
              <span className="text-yellow-200">oklch(0.145 0 0)</span>;
            </p>
            <p className="text-blue-300">&#125;</p>
          </div>
        </div>
      </div>
    </>
  );
};
