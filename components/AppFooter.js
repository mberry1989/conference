const AppFooter = () => {
  return (
    <footer className="py-20 md:py-10">
      <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12 text-center">
        <div>
          Sample application by
          <a
            href="https://github.com/mberry1989"
            className="tracking-wide font-medium text-gray-600 dark:text-gray-300 block md:px-4 transition hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Mike Berry
          </a>
        </div>
        <div>
          Design from
          <a
            href="https://www.tailwindawesome.com/resources/astrolus/demo"
            className="tracking-wide font-medium text-gray-600 dark:text-gray-300 block md:px-4 transition hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind Astrolus
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
