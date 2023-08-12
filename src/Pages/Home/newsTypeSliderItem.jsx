import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import useStyles from "./styles";

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
            <img
              src={newsItem.ImageURL}
              alt={newsItem.Title}
              className={classes.newsTypeSliderImage}
            />
            <div>
              <Link
                to={"news/" + newsItem.id}
                className={classes.LinkInnerPages}
              >
                <Typography className={classes.newsTypeSliderText}>
                  {newsItem.Title}
                </Typography>
              </Link>
              <Typography className={classes.newsTypeSliderDate}>
                <span className={classes.newsTypeSliderDateWord}>
                  قسم التحرير -
                </span>{" "}
                <span className={classes.newsTypeSliderDateText}>
                  {newsItem.PublishDate instanceof Date
                    ? getTimeDifferenceString(newsItem.PublishDate.toDate())
                    : getTimeDifferenceString(newsItem.PublishDate)}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsTypeSliderItem;
