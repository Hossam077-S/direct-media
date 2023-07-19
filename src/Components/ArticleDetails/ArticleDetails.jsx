import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";

import useStyles from "./style";

const ArticleDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Articles", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });
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

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{newsItem?.Text} </div>
        <div className={classes.Date}>{formattedDate}</div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={newsItem?.ImageURL}
              alt={newsItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>

          <div className={classes.Description}>{newsItem?.Content}</div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
