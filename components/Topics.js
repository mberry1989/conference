import RichText from "./RichText";

const Topic = ({ topic }) => {
  const headline = topic.elements.headline.value;
  const content = topic.elements.body;

  return (
    <div>
      {headline && (
        <div className="mt-8 text-center text-xl font-bold text-gray-800 dark:text-white md:text-3xl">
          {headline}
        </div>
      )}
      {content && (
        <div className="mt-8 text-center text-lg text-gray-800 dark:text-white md:text-xl">
          <RichText content={content} />
        </div>
      )}
    </div>
  );
};

export default Topic;
