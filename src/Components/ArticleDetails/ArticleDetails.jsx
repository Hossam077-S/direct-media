import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { db, getDoc, doc } from "../../Utils/firebase";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import ShareButton from "../ShareButton/ShareButton";

const ArticleDetails = () => {
  const location = useLocation();
  const writerItem = location.state;

  const classes = useStyles();

  const socialMedia = [
    { value: "facebook" },
    { value: "twitter" },
    { value: "telegram" },
    { value: "whatsupp" },
  ];

  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [loading, setLoading] = useState(true);

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Articles", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });

    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className={classes.container}>...يتم التحميل</div>;
  }

  console.log(writerItem);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{newsItem?.Text}</div>

        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={newsItem?.ImageURL}
              alt={newsItem?.Text}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Date_Share}>
            <div className={classes.Date}>
              {newsItem.PublishDate instanceof Date ? (
                <TimeDifferenceComponent
                  publishDate={newsItem.PublishDate.toDate()}
                />
              ) : (
                <TimeDifferenceComponent publishDate={newsItem.PublishDate} />
              )}
            </div>
            <div className={classes.shareButtons}>
              {socialMedia.map((category) => (
                <ShareButton
                  socialMedia={category?.value}
                  url={window.location.href}
                  Title={newsItem?.Text}
                  Hashtags={newsItem?.Hashtag}
                />
              ))}
            </div>
          </div>
          <div className={classes.Description}>{newsItem?.Content}</div>
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
