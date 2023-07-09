import { Typography } from "@mui/material";
import React from "react";

import Truncate from "react-truncate";

import useStyles from "./styles";

const ThreeSliderComponentItem = ({ index, item }) => {
  const classes = useStyles();

  return (
    <div key={index} className={classes.ThreeSlider}>
      <img
        src={item.ImageURL}
        alt={item.Title}
        width="160px"
        height="121px"
        className={classes.newsImage}
      />
      <div className={classes.title_description_threeSlider}>
        <Typography gutterBottom className={classes.sliderThreeTitle}>
          {item.Title}
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeDescription}>
          <Truncate
            lines={3}
            ellipsis={
              <span>
                ... <a href="/link/to/article">قراءة المزيد</a>
              </span>
            }
          >
            {item.Description}
          </Truncate>
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeTypeAndDate}>
          {item.Category} -{" "}
          {item.PublishDate instanceof Date
            ? item.PublishDate.toLocaleDateString("ar", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : item.PublishDate.toDate().toLocaleDateString("ar", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })}
        </Typography>
      </div>
    </div>
  );
};

export default ThreeSliderComponentItem;
