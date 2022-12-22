import Link from "next/link";

const AppHero = ({ title, welcomeContent = [], isLanding = false }) => {
  const eventOneUrl = "./horizons/new_york";
  const eventTwoUrl = "./horizons/london";

  let welcome;
  if (welcomeContent.length > 0) {
    welcome = welcomeContent[0];
  } else {
    welcome = {
      elements: {
        headline: {
          value: "Welcome to Kontent.ai Horizons!",
        },
        body: {
          value:
            "<p>Mark your calendar and grab your free ticket for this one-of-a-kind event.</p>",
        },
      },
    };
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-full text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              {title}
              <div className="text-primary dark:text-white border-t p-4 text-3xl md:text-4xl xl:text-5xl">
                {welcome.elements.headline.value}
              </div>
            </h1>
            <div className="text-2xl text-gray-700 dark:text-gray-300 text-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: welcome.elements.body.value,
                }}
              />
            </div>
            {isLanding && (
              <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                <Link href={eventOneUrl}>
                  <a className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                    <span className="relative text-base font-semibold text-white">
                      New York
                    </span>
                  </a>
                </Link>
                <Link href={eventTwoUrl}>
                  <a
                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 
                        before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b 
                        before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 
                        dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                  >
                    <span className="relative text-base font-semibold text-primary dark:text-white">
                      London
                    </span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHero;
