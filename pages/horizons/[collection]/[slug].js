import styles from "@styles/Home.module.css";
import deliveryClient from "@utils/client";
import AppHeader from "@components/AppHeader";
import AppFooter from "@components/AppFooter";
import AppHero from "@components/AppHero";
import { useRouter } from "next/router";
import Content from "@components/Content";
import { readFileSync } from "fs";


export default function ComposablePage({ page }) {
  const router = useRouter();
  const elements = page.elements;

  return (
    <div className={styles.container}>
      <AppHeader collection={page.system.collection} hasExtendedNav={true} />

      <main className={styles.main}>
        <AppHero title={elements.title.value} />

        <Content pageContent={page.elements.content} />
        
      </main>

      <AppFooter />
    </div>
  );
}

export async function getStaticPaths() {
  const data = readFileSync("./nav.json", "utf8");
  const map = JSON.parse(data);
  const pageArr = map.filter(
    (page) =>
      page["value"]["type"] === "page" ||
      page["value"]["type"] === "composable_page"
  );
  
  // avoids dynamic [slug] conflicts for composable pages
  const navPages = pageArr.filter(page => page["value"]["title"] !== "Speakers" && 
  page["value"]["title"] !== "Sponsors")

  const paths = navPages.map((page) => {
    return {
      params: {
        collection: page.value.collection,
        slug: page.value.slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await deliveryClient
    .items()
    .equalsFilter("elements.url", params.slug)
    .collection(params.collection)
    .depthParameter(6)
    .toPromise();

  const page = response.data.items[0];

  return {
    props: {
      page,
    },
  };
}
