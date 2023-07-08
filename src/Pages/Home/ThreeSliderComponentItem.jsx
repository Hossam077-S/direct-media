import { Typography } from "@mui/material";
import React from "react";

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
          {item.Description}
        </Typography>
        <Typography gutterBottom className={classes.sliderThreeTypeAndDate}>
          {item.Category} - 2022-01-01
        </Typography>
      </div>
    </div>
  );
};

export default ThreeSliderComponentItem;
