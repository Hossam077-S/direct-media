import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import ShareButton from "../ShareButton/ShareButton";
import FirestoreContext from "../../Utils/FirestoreContext2";
import MetaTags from "../MetaTags/MetaTags";

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
    { value: "whatsapp" },
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

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  if (loading) {
    return <div className={classes.container}>...يتم التحميل</div>;
  }

  return (
    <>
      <MetaTags
        title="Article Details"
        titleName={articleInfo?.Text}
        description={truncate(articleInfo?.Content, 65)}
        imageUrl={articleInfo?.ImageURL}
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
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
          <div className={classes.Description}>
            <span
              dangerouslySetInnerHTML={{
                __html: articleInfo?.Content,
              }}
            />
          </div>
          <div className={classes.writerSignture}>
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
