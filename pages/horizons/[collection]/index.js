import Head from "next/head";
import {
  getRootByCodenameAsync,
  filterPageByCollection,
  getCollectionPathsFromEnv,
  filterContentBySystemType
} from "../../../utilities/helpers";
import styles from "../../../styles/Home.module.css";
import Agenda from "../../../components/Agenda";
import Topic from "../../../components/Topics";
import Venue from "../../../components/Venue";
import AppHero from "../../../components/AppHero";
import AppHeader from "../../../components/AppHeader";
import AppFooter from "../../../components/AppFooter";

export default function Home({ page }) {
  const elements = page.elements;

  const agendaContent = filterContentBySystemType(elements, "agenda")
  const agenda = agendaContent[0];

  const welcomeContent = filterContentBySystemType(elements, "welcome")

  const venueContent = filterContentBySystemType(elements, "venue")
  const venue = venueContent[0];

  const topicContent = elements.content.linkedItems.filter(
    (item) => item.system.codename !== "welcome" && item.system.type === "topic"
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Kontent.ai Conference NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader collection={page.system.collection} hasExtendedNav={true} />

      <main className={styles.main}>
        <AppHero title={elements.title.value} welcomeContent={welcomeContent} />

        {venue && <Venue venue={venue} />}

        {agenda && <Agenda agenda={agenda} />}

        {topicContent.length > 0 &&
          topicContent.map((topic) => {
            return <Topic topic={topic} key={topic.system.id} />;
          })}
      </main>

      <AppFooter />
    </div>
  );
}

export async function getStaticPaths() {
  const collectionPaths = getCollectionPathsFromEnv();

  return {
    paths: collectionPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const root = await getRootByCodenameAsync("root");
  const page = filterPageByCollection(root, params);

  return {
    props: {
      page,
    },
  };
}
