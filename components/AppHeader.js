import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { filterPageMapBySlugAndCollection } from "../utilities/helpers";

const AppHeader = ({ collection, hasExtendedNav = false, backBtn = false }) => {
  const [navigation, setNavigation] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    async function fetchNav() {
    const response = await fetch(
      '/api/navigationFetcher'
    )
      const value = await response.json()
      setNavigation(value);
      setLoading(false)
  }

    fetchNav();
  }, []);

  const router = useRouter();

  if (isLoading) return <p>Loading...</p>
  if (!navigation) return <p>No navigation data</p>

  const menuItems = [
    {title: "Speakers", slug: "speakers"}, 
    {title: "Sponsors", slug: "sponsors"}
  ]

  return (
    <header>
      <nav className="z-10 w-11/12">
        <div className="flex flex-wrap items-center justify-between md:gap-0 relative">
          <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
            <Link href="/" aria-label="logo">
              <a>
              <Image
                src="https://di8m9w6rqrh5d.cloudfront.net/431N1BdWF87lzD2tD9i9n9PCiyTYkIIN/922784109199.svg"
                height="100"
                width="200"
                alt="Kontent.ai logo"
                className="hover:cursor-pointer"
              />
              </a>
            </Link>
          </div>
          {hasExtendedNav && (
            <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
               <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                {menuItems.map((item, index) => {
                  const url = filterPageMapBySlugAndCollection(navigation, collection, item.slug).value.url
                  return (
                 <li key={index}>
                   <Link href={url}>
                     <a className="block md:px-4 transition hover:text-primary">
                       <span>{item.title.toUpperCase()}</span>
                     </a>
                   </Link>
                 </li>
                 )
                 })}
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
