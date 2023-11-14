import React from "react";

const TimeDifferenceComponent = ({ publishDate }) => {
  const getTimeDifferenceString = (publishDate) => {
    const currentTime = new Date();
    let publishDateObject =
      publishDate instanceof Date ? publishDate : publishDate?.toDate(); // Convert to Date object if necessary

    const timeDifference = currentTime - publishDateObject;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (hoursDifference >= 24) {
      return publishDateObject.toLocaleDateString("ar", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    } else if (hoursDifference >= 1) {
      return `منذ ${hoursDifference.toLocaleString("en-US")} ساعة`;
    } else if (hoursDifference < 1) {
      return `منذ ${minutesDifference.toLocaleString("en-US")} دقيقة`;
    } else return ``;
  };

  const timeString = getTimeDifferenceString(publishDate);

  return <>{timeString}</>;
};

export default TimeDifferenceComponent;
