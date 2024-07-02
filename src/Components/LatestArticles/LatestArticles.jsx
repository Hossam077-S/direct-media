import React, { useState } from "react";
import useStyles from "./styles";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LazyImage from "../LazyImage/LazyImage";

const LatestArticles = ({ writersData, articlesData }) => {
  const classes = useStyles();

  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  function truncate(source, size) {
    return source?.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  const getLatestArticles = (writersData, articlesData, topN) => {
    // Combine articles with writers
    const combinedData = articlesData.map((article) => {
      const writer = writersData.find((writer) =>
        writer.ArticleID.includes(article.ArticleID)
      );
      return { ...article, writer };
    });

    // Sort by date
    const sortedData = combinedData.sort(
      (a, b) => new Date(b.Date) - new Date(a.Date)
    );

    // Get the top N latest articles
    return sortedData.slice(0, topN).map((article) => ({
      writer: article.writer,
      article: {
        ArticleID: article.ArticleID,
        Date: article.Date,
        Text: article.Text,
      },
    }));
  };

  const latestArticles = getLatestArticles(writersData, articlesData, 4);

  return writersData?.length > 0 ? (
    <div className={classes.articlContentDiv}>
      <div className={classes.articlImage_Divider}>
        <List className={classes.newsList}>
          {latestArticles.map((articleItem, index) => (
            <React.Fragment key={index}>
              <ListItem
                className={`${classes.newsListItem} ${
                  index === hoverIndex ? classes.activeListItem : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={classes.newsItemContent}>
                  {index >= 0 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      className={`${classes.articlDivider} ${
                        index === hoverIndex ? classes.activeDivider : ""
                      }`}
                    />
                  )}
                  <div className={classes.descriptionContent}>
                    <div className={classes.newsItemTitle}>
                      <Link
                        to={`article/${articleItem.article.ArticleID}`}
                        className={classes.LinkInnerPages}
                      >
                        <Typography className={classes.articleContent}>
                          <span>{truncate(articleItem.article.Text, 65)}</span>
                        </Typography>
                      </Link>
                    </div>
                    <div className={classes.newsItemDescription}>
                      <span
                        style={{
                          fontSize: "30px",
                          paddingLeft: "5px",
                        }}
                      >
                        ,,
                      </span>
                      <span>{articleItem.writer.Name}</span>
                    </div>
                  </div>

                  <ListItemAvatar>
                    <LazyImage
                      alt={articleItem.writer.Name}
                      src={articleItem.writer.ProfileImage}
                      className={classes.newsAvatar}
                    />
                  </ListItemAvatar>
                </div>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  ) : (
    <div>
      <Skeleton variant="rectangular" height="364px" />
    </div>
  );
};

export default LatestArticles;
