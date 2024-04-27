import React from "react";

const TimeDifferenceComponent = ({ publishDate }) => {
  const getTimeDifferenceString = (publishDate) => {
    const currentTime = new Date();
    let publishDateObject;

    if (publishDate && publishDate.seconds && publishDate.nanoseconds) {
      // Convert Firestore Timestamp to JavaScript Date object
      publishDateObject = new Date(
        publishDate.seconds * 1000 + publishDate.nanoseconds / 1000000
      );
    } else if (publishDate instanceof Date) {
      publishDateObject = publishDate;
    } else if (typeof publishDate === "string") {
      // Convert string to Date object
      publishDateObject = new Date(publishDate);
    }

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
