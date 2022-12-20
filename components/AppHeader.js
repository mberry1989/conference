import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const AppHeader = ({ collection, hasExtendedNav = false, backBtn = false }) => {
  const speakersUrl = `./${collection}/speakers`;
  const sponsorsUrl = `./${collection}/sponsors`;

  const router = useRouter();

  return (
    <header>
      <nav className="z-10 w-11/12">
        <div className="flex flex-wrap items-center justify-between md:gap-0 relative">
          <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
            <Link href="/" aria-label="logo">
              <Image
                src="https://di8m9w6rqrh5d.cloudfront.net/431N1BdWF87lzD2tD9i9n9PCiyTYkIIN/922784109199.svg"
                height="100"
                width="200"
                alt="Kontent.ai logo"
                className="hover:cursor-pointer"
              />
            </Link>
          </div>
          {hasExtendedNav && (
            <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
              <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                <li>
                  <Link href={speakersUrl}>
                    <a className="block md:px-4 transition hover:text-primary">
                      <span>Speakers</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={sponsorsUrl}>
                    <a className="block md:px-4 transition hover:text-primary">
                      <span>Sponsors</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {backBtn && (
            <ul>
              <li>
                <span
                  className="tracking-wide font-medium text-gray-600 dark:text-gray-300 block md:px-4 transition hover:text-primary"
                  onClick={() => router.back()}
                  style={{ cursor: "pointer" }}
                >
                  &lt; Back
                </span>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
