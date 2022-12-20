import styles from "../../../styles/Home.module.css";
import Sponsor from "../../../components/Sponsor";
import Topic from "../../../components/Topics";
import AppHero from "../../../components/AppHero";
import { useRouter } from "next/router";
import AppHeader from "../../../components/AppHeader";
import AppFooter from "../../../components/AppFooter";
import {
  filterContentBySystemType,
  filterItemsByCollection,
  filterPageByCollection,
  getCollectionPathsFromEnv,
  getItemsByTypeAsync,
  getRootByCodenameAsync,
  filterSubPageByUrl
} from "../../../utilities/helpers";

export default function Sponsors({ eventPage, page, agendaSponsors }) {
  const pageElements = page.elements;
  const topicContent = filterContentBySystemType(pageElements, "topic");

  const router = useRouter();

  return (
    <div className={styles.container}>
      <AppHeader backBtn={true} />
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
        <div className="md:grid-cols-2 lg:grid-cols-3 grid mt-8">
          {agendaSponsors.length > 0 &&
            agendaSponsors.map((sponsor) => {
              return (
                <div className="text-center" key={sponsor.system.id}>
                  <Sponsor sponsor={sponsor} />
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
  const page = filterSubPageByUrl(eventPage, "sponsors");
  // ==end page content==

  // ==start dynamic sponsor list==
  const sponsors = await getItemsByTypeAsync("sponsor");

  const sponsorsByCollection = filterItemsByCollection(sponsors, params);
  const globalSponsors = filterItemsByCollection(sponsors); // global is default

  const agendaSponsors = [...sponsorsByCollection, ...globalSponsors];

  // ==end dynamic speakers list==

  return {
    props: {
      eventPage,
      page,
      agendaSponsors,
    },
  };
}
