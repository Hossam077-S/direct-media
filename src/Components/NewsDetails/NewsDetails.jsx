import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import {
  db,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "../../Utils/firebase";

import Slider from "react-slick";

import useStyles from "./style";

import ReactPlayer from "react-player";

const NewsDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);

  const newsTypesSliderSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: relatedNews.length || 0,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    rtl: true,
    vertical: true,
    lazyLoad: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: relatedNews.length || 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: relatedNews.length || 1,
        },
      },
    ],
  };

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
            <ReactPlayer
              url={newsItem?.YoutubeLink}
              className={classes.youtubeVideo}
            />
          </div>

          {/* Display the related news section */}
          {relatedNews.length > 0 && (
            <div className={classes.relatedNewsDiv}>
              <h2>الأخبار المرتبطة</h2>

              <div className={classes.newsTypeSlider}>
                <ul className={classes.ul}>
                  <Slider {...newsTypesSliderSettings}>
                    {relatedNews.map((relatedNewsItem) => (
                      <li
                        key={relatedNewsItem.id}
                        className={classes.relatedNewsLi}
                      >
                        <div>
                          <img
                            src={relatedNewsItem.ImageURL}
                            alt={"arrowLeft"}
                            className={classes.relatedNewsImage}
                          />
                        </div>
                        <div className={classes.relatedNewsContent}>
                          <Link
                            to={`/news/${relatedNewsItem.id}`}
                            className={classes.relatedNewsLink}
                            onClick={() => window.scrollTo(0, 0)}
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
                        </div>
                      </li>
                    ))}
                  </Slider>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
