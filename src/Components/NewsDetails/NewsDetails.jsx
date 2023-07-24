import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";

import useStyles from "./style";

import YouTube from "react-youtube";
import URLParse from "url-parse";

const NewsDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);

  const [videoId, setVideoId] = useState(null);

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "News", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    if (newsItem.Category) {
      const q = query(
        collection(db, "News"),
        where("Category", "==", newsItem.Category)
      );

      const unsubscribeRelatedNews = onSnapshot(q, (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });

        setRelatedNews(result);

        console.log(result);
      });
      return () => unsubscribeRelatedNews();
    }
  }, [newsItem.Category]);

  useEffect(() => {
    let videoUrl = null;
    videoUrl = newsItem.YoutubeLink;
    if (videoUrl) {
      const url = new URLParse(videoUrl, true);
      const id = url.query.v;
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [newsItem]);

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
        <div className={classes.Title}>{newsItem?.Title} </div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={newsItem?.ImageURL}
              alt={newsItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Date}>{formattedDate}</div>

          <div className={classes.Description}>
            <span style={{ fontFamily: "GE_SS_Two_M" }}>
              {newsItem?.Category}
            </span>{" "}
            - {newsItem?.Description}
          </div>
          <div className={classes.VideoDiv}>
            <YouTube videoId={videoId} className={classes.youtubeVideo} />
          </div>

          {/* Display the related news section */}
          {relatedNews.length > 0 && (
            <div className={classes.relatedNewsDiv}>
              <h2>الأخبار المرتبطة</h2>
              <ul>
                {relatedNews.map((relatedNewsItem) => (
                  <li
                    key={relatedNewsItem.id}
                    className={classes.relatedNewsLi}
                  >
                    <Link
                      to={`/news/${relatedNewsItem.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h3 className={classes.relatedTitle}>
                        {relatedNewsItem.Title}
                      </h3>
                    </Link>
                    <p className={classes.relatedDescription}>
                      {relatedNewsItem.Description}
                    </p>
                    <p className={classes.relatedDate}>
                      {relatedNewsItem.PublishDate.toDate().toLocaleDateString(
                        "ar",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
