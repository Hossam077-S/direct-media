import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import useStyles from "./styles";
import LazyImage from "../../Components/LazyImage/LazyImage";
import TimeDifferenceComponent from "../../Components/TimeDifference/TimeDifferenceComponent";

const NewsTypeSliderItem = ({ Item, ItemIndex }) => {
  const classes = useStyles();

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <>
      {Item.map((newsItem, index) => (
        <div
          key={ItemIndex * 5 + index}
          className={classes.newsTypeSliderItems}
        >
          <div className={classes.newsTypeSliderItem}>
            <LazyImage
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
                  <span>{truncate(newsItem.Title, 80)}</span>
                </Typography>
              </Link>
              <Typography className={classes.newsTypeSliderDate}>
                <span className={classes.newsTypeSliderDateWord}>
                  قسم التحرير -
                </span>{" "}
                <span className={classes.newsTypeSliderDateText}>
                  {newsItem.PublishDate instanceof Date ? (
                    <TimeDifferenceComponent
                      publishDate={newsItem.PublishDate.toDate()}
                    />
                  ) : (
                    <TimeDifferenceComponent
                      publishDate={newsItem.PublishDate}
                    />
                  )}
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
