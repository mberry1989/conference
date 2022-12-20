import RichText from "./RichText";
import Image from "next/image";

const Venue = ({ venue }) => {
  const venueName = venue.elements.name.value;
  const venueAddress = venue.elements.address.value;
  const venueDescription = venue.elements.description;
  const venueLink = venue.elements.link.value;
  const venueImage = venue.elements.image;

  return (
    <div className="w-full bg-blend-darken">
      <div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
        {venueImage && (
          <div className="md:5/12 lg:w-1/2 mt-24 justify-center flex border rounded-3xl overflow-hidden">
            <Image
              src={venueImage.value[0].url}
              alt="image"
              loading="lazy"
              width={venueImage.value[0].width}
              height={venueImage.value[0].height}
            />
          </div>
        )}
        <div className="md:7/12 lg:w-1/2">
          {venueName && (
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              {venueName}
            </h2>
          )}
          {venueDescription && (
            <div className="my-8 text-gray-600 dark:text-gray-300">
              <RichText content={venueDescription} />
            </div>
          )}
          {venueLink && (
            <div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
              <div className="mt-8 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-5/6">
                  <h3 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
                    For more info visit:
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    <a href={venueLink}>{venueLink}</a>
                  </p>
                </div>
              </div>
              <div className="pt-4 flex gap-4 md:items-center">
                <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                {venueAddress && (
                  <div className="w-5/6">
                    <h4 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
                      {venueAddress}
                    </h4>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Venue;
