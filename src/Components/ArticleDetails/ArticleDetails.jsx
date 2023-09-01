import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { db, getDoc, doc } from "../../Utils/firebase";

import useStyles from "./style";

const ArticleDetails = () => {
  const location = useLocation();
  const writerItem = location.state;

  const classes = useStyles();

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

  const formattedDate = newsItem?.PublishDate?.toDate()?.toLocaleDateString(
    "ar",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  if (loading) {
    return <div className={classes.container}>Loading...</div>;
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{newsItem?.Text}</div>

        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={newsItem?.ImageURL}
              alt={newsItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Date}>{formattedDate}</div>
          <div className={classes.Description}>{newsItem?.Content}</div>
          <div className={classes.writerSignture}>
            <img
              src={writerItem?.ProfileImage}
              alt={writerItem?.Name}
              className={classes.profileWriter}
            />
            <p className={classes.writerName}>{writerItem?.Name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
