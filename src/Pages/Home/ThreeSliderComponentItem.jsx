import { Typography } from "@mui/material";
import React from "react";

import Truncate from "react-truncate";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const getTimeDifferenceString = (publishDate) => {
  const currentTime = new Date();
  const timeDifference = currentTime - publishDate;
  const minutesDifference = Math.round(timeDifference / (1000 * 60));
  const hoursDifference = Math.round(minutesDifference / 60);

  if (hoursDifference >= 24) {
    return publishDate.toDate().toLocaleDateString("ar", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  } else if (hoursDifference >= 1) {
    return `منذ ${hoursDifference} ساعة`;
  } else {
    return `منذ ${minutesDifference} دقيقة`;
  }
};

const ThreeSliderComponentItem = ({ index, item, id }) => {
  const classes = useStyles();

  return (
    <div key={index} className={classes.ThreeSlider}>
      <Link to={"news/" + id}>
        <img
          src={item.ImageURL}
          alt={item.Title}
          className={classes.threenewsImage}
        />
      </Link>
      <div className={classes.title_description_threeSlider}>
        <Typography gutterBottom className={classes.sliderThreeTitle}>
          {item.Title}
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeDescription}>
          <Truncate lines={3} ellipsis={<span>...</span>}>
            {item.Description}
          </Truncate>
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeTypeAndDate}>
          {item.Category} -{" "}
          {item.PublishDate instanceof Date
            ? getTimeDifferenceString(item.PublishDate.toDate())
            : getTimeDifferenceString(item.PublishDate)}
        </Typography>
      </div>
    </div>
  );
};

export default ThreeSliderComponentItem;
