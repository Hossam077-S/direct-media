import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import useStyles from "./styles";
import LazyImage from "../../Components/LazyImage/LazyImage";
import TimeDifferenceComponent from "../../Components/TimeDifference/TimeDifferenceComponent";

const ThreeSliderComponentItem = ({ index, item, id }) => {
  const classes = useStyles();

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

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
          <span>{truncate(item.Description, 90)}</span>
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeTypeAndDate}>
          {item.Category} -{" "}
          {item.PublishDate instanceof Date ? (
            <TimeDifferenceComponent publishDate={item.PublishDate.toDate()} />
          ) : (
            <TimeDifferenceComponent publishDate={item.PublishDate} />
          )}
        </Typography>
      </div>
    </div>
  );
};

export default ThreeSliderComponentItem;
