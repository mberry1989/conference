import {
  getRootByCodenameAsync,
  filterPageByCollection,
  getCollectionPathsFromEnv,
  filterContentBySystemType,
  filterSubPageByUrl,
  getItemsByTypeAsync,
  filterItemsByCollection,
} from "@utils/helpers";
import styles from "../../../styles/Home.module.css";
import Speaker from "@components/Speaker";
import Topic from "@components/Topics";
import AppHero from "@components/AppHero";
import AppHeader from "@components/AppHeader";
import AppFooter from "@components/AppFooter";

export default function Speakers({ eventPage, page, agendaSpeakers }) {
  const pageElements = page.elements;
  const topicContent = filterContentBySystemType(pageElements, "topic");

  return (
    <div className={styles.container}>
      <AppHeader collection= {page.system.collection} hasExtendedNav={true} backBtn={false} />
      <div className={styles.container}>
        <AppHero title={eventPage.elements.title.value} />
        <div className="mt-8 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
          {pageElements.title.value}
        </div>
        <div className="mt-8 text-2xl text-gray-700 dark:text-gray-300">
          {topicContent.length > 0 &&
            topicContent.map((topic) => {
              return <Topic topic={topic} key={topic.system.id} />;
            })}
        </div>
        <div className="md:grid-cols-2 lg:grid-cols-3 gap-2 grid mt-8">
          {agendaSpeakers.length > 0 &&
            agendaSpeakers.map((speaker) => {
              return (
                <div
                  key={speaker.system.id}
                  className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none"
                >
                  <div>
                    <Speaker speaker={speaker} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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
  // ==start page content==
  const root = await getRootByCodenameAsync("root");
  const eventPage = filterPageByCollection(root, params);
  const page = filterSubPageByUrl(eventPage, "speakers");
  // ==end page content==

  // ==start dynamic speakers list==
  const speakers = await getItemsByTypeAsync("speaker");
  const speakersByCollection = filterItemsByCollection(speakers, params);
  const globalSpeakers = filterItemsByCollection(speakers); // global is default

  const agendaSpeakers = [...speakersByCollection, ...globalSpeakers];
  // ==end dynamic speakers list==

  return {
    props: {
      eventPage,
      page,
      agendaSpeakers,
    },
  };
}
