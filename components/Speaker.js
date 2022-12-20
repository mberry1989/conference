import Image from "next/image";
import RichText from "./RichText";

const Speaker = ({ speaker }) => {
  const bio = speaker.elements.bio;
  const firstName = speaker.elements.first_name.value;
  const lastName = speaker.elements.last_name.value;
  const title = speaker.elements.job_title.value;
  const speakerImage = speaker.elements.photo.value

  return (
    <>
    {speakerImage.length > 0 &&
      <Image
        className="w-12 h-12 rounded-full"
        src={speakerImage[0].url}
        alt=""
        width="80"
        height="80"
        loading="lazy"
      />
    }
      <h2 className="text-lg font-medium text-gray-700 dark:text-white">
        {firstName}&nbsp;{lastName}
      </h2>
      <h3 className="text-md text-gray-500 dark:text-gray-300">{title}</h3>
      <div>
        <RichText content={bio} />
      </div>
    </>
  );
};

export default Speaker;
