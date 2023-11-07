import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import ShareButton from "../ShareButton/ShareButton";
import FirestoreContext from "../../Utils/FirestoreContext2";

const ArticleDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  const { articlesData } = useContext(FirestoreContext);

  const [loading, setLoading] = useState(true);
  const [articleInfo, setArticleInfo] = useState(null);

  const writerItem = location.state || {};

  const classes = useStyles();

  const socialMedia = [
    { value: "facebook" },
    { value: "twitter" },
    { value: "telegram" },
    { value: "whatsupp" },
  ];

  useEffect(() => {
    // Find the article with the same id from the articles data context
    const article = articlesData.find((article) => article.id === id);

    if (article) {
      setArticleInfo(article);
    } else {
      console.log("Article not found");
    }

    setLoading(false);
  }, [id, articlesData]);

  if (loading) {
    return <div className={classes.container}>...يتم التحميل</div>;
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{articleInfo?.Text}</div>

        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={articleInfo?.ImageURL}
              alt={articleInfo?.Text}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Date_Share}>
            <div className={classes.Date}>
              {articleInfo?.PublishDate instanceof Date ? (
                <TimeDifferenceComponent
                  publishDate={articleInfo?.PublishDate.toDate()}
                />
              ) : (
                <TimeDifferenceComponent
                  publishDate={articleInfo?.PublishDate}
                />
              )}
            </div>
            <div className={classes.shareButtons}>
              {socialMedia.map((category) => (
                <ShareButton
                  socialMedia={category?.value}
                  url={window.location.href}
                  Title={articleInfo?.Text}
                  Hashtags={articleInfo?.Hashtag}
                />
              ))}
            </div>
          </div>
          <div className={classes.Description}>{articleInfo?.Content}</div>
          <div className={classes.writerSignature}>
            {writerItem ? (
              <>
                <img
                  src={writerItem.ProfileImage}
                  alt={writerItem.Name}
                  className={classes.profileWriter}
                />
                <p className={classes.writerName}>{writerItem.Name}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
