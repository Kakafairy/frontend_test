export const LogoConfiguration = () => {
  return (
    <>
      <h3 className=" text-black text-xl font-semibold mt-8 dark:text-white">
        Logo
      </h3>
      <div className="p-6 rounded-md border mt-4 border-border dark:border-dark_border">
        <p className="text-base font-medium text-midnight_text dark:text-grey flex lg:flex-row flex-col">
          1. Change Logo over here :{" "}
          <span className="font-semibold text-base overflow-x-auto">
            src/app/components/layout/header/logo/index.tsx
          </span>
        </p>
        <div className="py-4 px-5 rounded-md bg-black mt-8">
          <div className="text-sm text-gray-400 font-mono leading-relaxed">
            <p>
              <span className="text-gray-500">&lt;</span>
              <span className="text-blue-400">Link</span>{" "}
              <span className="text-blue-200">href</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"/"</span>
              <span className="text-gray-500">&gt;</span>
            </p>
            {/* Light Logo */}
            <p className="ms-4">
              <span className="text-gray-500">&lt;</span>
              <span className="text-blue-400">Image</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">src</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"/images/logo/logo.svg"</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">alt</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"logo"</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">width</span>
              <span className="text-gray-500">=&#123;</span>
              <span className="text-yellow-200">160</span>
              <span className="text-gray-500">&#125;</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">height</span>
              <span className="text-gray-500">=&#123;</span>
              <span className="text-yellow-200">50</span>
              <span className="text-gray-500">&#125;</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">className</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"dark:hidden"</span>
            </p>
            <p className="ms-4">
              <span className="text-gray-500">/&gt;</span>
            </p>

            {/* Dark Logo */}
            <p className="ms-4 mt-2">
              <span className="text-gray-500">&lt;</span>
              <span className="text-blue-400">Image</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">src</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">
                "/images/logo/DarkModeLogo.svg"
              </span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">alt</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"logo"</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">width</span>
              <span className="text-gray-500">=&#123;</span>
              <span className="text-yellow-200">160</span>
              <span className="text-gray-500">&#125;</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">height</span>
              <span className="text-gray-500">=&#123;</span>
              <span className="text-yellow-200">50</span>
              <span className="text-gray-500">&#125;</span>
            </p>
            <p className="ms-8">
              <span className="text-blue-200">className</span>
              <span className="text-gray-500">=</span>
              <span className="text-green-400">"dark:block hidden"</span>
            </p>
            <p className="ms-4">
              <span className="text-gray-500">/&gt;</span>
            </p>
            <p>
              <span className="text-gray-500">&lt;/</span>
              <span className="text-blue-400">Link</span>
              <span className="text-gray-500">&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
