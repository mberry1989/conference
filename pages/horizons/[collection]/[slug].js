import styles from "../../../styles/Home.module.css";
import deliveryClient from "../../../utilities/client";
import RichText from "../../../components/RichText";
import AppHeader from "../../../components/AppHeader";
import AppFooter from "../../../components/AppFooter";
import AppHero from "../../../components/AppHero";
import AgendaItem from "../../../components/AgendaItem";
import { useRouter } from "next/router";

export default function AgendaItemDetail({ item }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <AppHeader />
      <AppHero />
      <div className="w-full flex justify-center">
        <div className="mt-8 sm:w-10/12 md:w-1/2">
          <div
            key={item.system.id}
            className="text-left aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
          >
            <span
              className="tracking-wide font-medium text-gray-600 dark:text-gray-300 block md:px-4 transition hover:text-primary"
              onClick={() => router.back()}
              style={{ cursor: "pointer" }}
            >
              &lt; Back
            </span>
            <AgendaItem item={item} />
            <RichText content={item.elements.description} />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export async function getStaticPaths({ context }) {
  const response = await deliveryClient
    .items()
    .type("agenda_item")
    .elementsParameter(["url_slug"])
    .toPromise();

  const agendaItems = response.data.items;
  const agendaPaths = agendaItems.map((item) => {
    return {
      params: {
        collection: item.system.collection,
        slug: item.elements.url_slug.value,
      },
    };
  });

  return {
    paths: agendaPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // ==start dynamic content==
  const response = await deliveryClient
    .items()
    .equalsFilter("elements.url_slug", params.slug)
    .collection(params.collection)
    .toPromise();
  const item = response.data.items[0];

  // ==end dynamic speakers list==

  return {
    props: {
      item,
    },
  };
}
