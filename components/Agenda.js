import AgendaItem from "./AgendaItem";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Agenda = ({ agenda }) => {
  const agendaItems = agenda.elements.agenda_items.linkedItems;
  return (
    <div className={styles.description}>
      <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
        Your <span className="text-primary">{agenda.elements.name.value}</span>{" "}
        agenda
      </h2>
      {agendaItems.map((item) => {
        return (
          <>
            <Link
              href={`${agenda.system.collection}/agenda/${item.elements.url_slug.value}`}
            >
              <div
                key={item.system.id}
                className="sm:flex justify-between hover:cursor-pointer"
              >
                <AgendaItem item={item} />
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default Agenda;
