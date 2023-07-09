import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "News", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });
  }, [id]);

  return (
    <>
      <div>id is : {id}</div>
      <div>id is : {newsItem?.Title}</div>
    </>
  );
};

export default NewsDetails;
