import { Typography } from "@mui/material";
import React from "react";

import useStyles from "./styles";

const NewsTypeSliderItem = ({ Item, ItemIndex }) => {
  const classes = useStyles();

  return (
    <>
      {Item.map((newsItem, index) => (
        <div
          key={ItemIndex * 5 + index}
          className={classes.newsTypeSliderItems}
        >
          <div className={classes.newsTypeSliderItem}>
            <div>
              <Typography className={classes.newsTypeSliderText}>
                {newsItem.Title}
              </Typography>

              <Typography className={classes.newsTypeSliderDate}>
                <span className={classes.newsTypeSliderDateWord}>
                  قسم التحرير -
                </span>{" "}
                <span className={classes.newsTypeSliderDateText}>
                  {newsItem.PublishDate.toDate().toLocaleDateString("ar", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Typography>
            </div>
            <img
              src={newsItem.ImageURL}
              alt={newsItem.Title}
              className={classes.newsTypeSliderImage}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsTypeSliderItem;
