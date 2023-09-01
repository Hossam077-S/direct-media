import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./styles";
import LazyImage from "../../Components/LazyImage/LazyImage";

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
      <LazyImage
        src={item.ImageURL}
        alt={item.Title}
        className={classes.threenewsImage}
      />
      <div className={classes.title_description_threeSlider}>
        <Link to={"news/" + id} className={classes.LinkInnerPages}>
          <Typography gutterBottom className={classes.sliderThreeTitle}>
            {item.Title}
          </Typography>
        </Link>
        <Typography gutterBottom className={classes.sliderThreeDescription}>
          <span>
            <Dotdotdot clamp={3}>{item.Description}</Dotdotdot>
          </span>
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
