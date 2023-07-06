import { Typography } from "@mui/material";
import React from "react";

import useStyles from "./styles";

const NewsTypeSliderItem = ({ Item, ItemIndex }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

  return (
    <div>
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
    </div>
  );
};

export default NewsTypeSliderItem;
