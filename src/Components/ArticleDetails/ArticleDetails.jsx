import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import ShareButton from "../ShareButton/ShareButtonV2";
import FirestoreContext from "../../Utils/FirestoreContext2";
import MetaTags from "../MetaTags/MetaTags";

const ArticleDetails = () => {
  const { id } = useParams();

  const { articlesData, writersData } = useContext(FirestoreContext);

  const [loading, setLoading] = useState(true);
  const [articleInfo, setArticleInfo] = useState(null);
  const [writerItem, setWriterItem] = useState(null);

  const classes = useStyles();

  const socialMedia = [
    { value: "facebook" },
    { value: "twitter" },
    { value: "telegram" },
    { value: "whatsapp" },
  ];

  useEffect(() => {
    setLoading(true);

    // Check if articlesData and writersData are loaded
    if (!articlesData || !writersData) {
      console.log("Data is still loading");
      setLoading(false);
      return;
    }

    // Find the article with the same id from the articles data context
    const article = articlesData.find((a) => a.id === id);

    if (article) {
      setArticleInfo(article);

      // Find the writer using the WriterID from the found article
      const writer = writersData.find((w) => w.id === article.WriterID);

      if (writer) {
        setWriterItem(writer);
      } else {
        console.log(`Writer with ID ${article.WriterID} not found`);
      }
    } else {
      console.log(`Article with ID ${id} not found`);
    }

    setLoading(false);
  }, [id, articlesData, writersData]);

  if (!articlesData || !writersData) {
    setLoading(true);
  }

  function truncate(source, size) {
    return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
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
              <p className={classes.shareText}>{articleInfo && "مشاركة:"}</p>
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
          <div className={classes.Hashtag}>{articleInfo?.Hashtag}</div>
          <div className={classes.writerSignture}>
            {writerItem ? (
              <>
                <img
                  src={writerItem?.ProfileImage}
                  alt={writerItem?.Name}
                  className={classes.profileWriter}
                />
                <p className={classes.writerName}>{writerItem?.Name}</p>
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
