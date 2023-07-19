import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";

import useStyles from "./style";

const WriterDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [writerItem, setWriterItem] = useState({});

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Writers", id);

    getDoc(q).then((docSnap) => {
      setWriterItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {}, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{writerItem?.Name}</div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={writerItem?.ProfileImage}
              alt={writerItem?.Name}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Description}>{writerItem?.ArticleID}</div>
        </div>
      </div>
    </>
  );
};

export default WriterDetails;
