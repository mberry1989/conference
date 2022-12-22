import moment from "moment";

const AgendaItem = ({ item }) => {
  const startTime = moment(new Date(item.elements.start_time.value))
    .local()
    .format("h:mm");
  const endTime = moment(new Date(item.elements.end_time.value))
    .local()
    .format("h:mm");
  const room = item.elements.room.linkedItems[0];

  return (
    <>
      <div className="w-full flex border-t border-b">
        <div className="text-left">
          <div className="w-full text-lg font-semibold text-gray-700 dark:text-white">
            <div className="w-full mt-2 text-gray-500 text-2xl">
              {item.elements.name.value}
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {" "}
              {startTime} - {endTime}{" "}
            </div>
          </div>
        </div>
        <div className="flex w-full mt-2 justify-end">
          <div className="text-right text-xl font-semibold text-gray-700 ">
            {room.elements.name.value}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgendaItem;
