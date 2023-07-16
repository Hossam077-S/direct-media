import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";
import useStyles from "./style";

const NewsDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "News", id);

    getDoc(q).then((docSnap) => {
      console.info("Item Data: ", docSnap.data());
      setNewsItem(docSnap.data());
    });
  }, [id]);

  return (
    <>
      <div className={classes.container}>
        <div className="title">{newsItem?.Title}</div>
        <div className="title">{newsItem?.Category}</div>
        <div className="content">
          <div className="image">
            <img src={newsItem?.ImageURL} alt="" />
          </div>
          <div className="description">{newsItem?.Description}</div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
