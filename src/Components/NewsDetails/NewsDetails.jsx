import React, { useContext, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Slider from "react-slick";

import ReactPlayer from "react-player";
import ShareButton from "../../Components/ShareButton/ShareButtonV2";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import { SuspenseFallback2 } from "../SuspenseFallback/SuspenseFallback2";
import FirestoreContext from "../../Utils/FirestoreContext2";
import { analytics, logEvent } from "../../Utils/firebase";

const NewsDetails = () => {
  const classes = useStyles();

  const { groupedData, fetchRelatedNews, relatedNews } =
    useContext(FirestoreContext);

  const socialMedia = [
    { value: "facebook" },
    { value: "twitter" },
    { value: "telegram" },
    { value: "whatsapp" },
  ];
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [relatedNewsItems, setRelatedNewsItems] = useState([]);

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

  useEffect(() => {
    let tids = [];
    // Iterate over each category in groupedData
    Object.values(groupedData).forEach((newsCategory) => {
      // Find the news item with the specified id in the current category
      const news = newsCategory.find((newsItem) => newsItem.NewsID === id);
      // If found, set the newsItem state and exit the loop
      if (news) {
        setNewsItem(news);
        if (news?.Tadmin?.length > 0) {
          news?.Tadmin?.forEach((ids) => {
            if (ids !== " ") {
              tids.push(ids);
            }
          });
        }
      }
    });

    setRelatedNewsItems(tids);
    setLoading(false); // Set loading to false after fetching the news item
  }, [groupedData, id]); // Depend on id and groupedData

  useEffect(() => {
    if (newsItem?.Tadmin?.length > 0 && relatedNewsItems?.length > 0) {
      fetchRelatedNews(relatedNewsItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsItem]);

  useEffect(() => {
    fetchRelatedNews([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <SuspenseFallback2 cName="dots" />;
  }

  logEvent(analytics, "page_view", {
    page_title: "NewsDetails",
    page_location: "News",
  });

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{newsItem?.Title} </div>
        <div className={classes.ImageDiv}>
          <div className={classes.Content}>
            <img
              src={newsItem?.ImageURL}
              alt={newsItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Date_Share}>
            <div className={classes.Date}>
              {newsItem?.PublishDate instanceof Date ? (
                <TimeDifferenceComponent
                  publishDate={newsItem?.PublishDate?.toDate()}
                />
              ) : (
                <TimeDifferenceComponent publishDate={newsItem?.PublishDate} />
              )}
            </div>
            <div className={classes.shareButtons}>
              {socialMedia.map((category, index) => (
                <ShareButton
                  key={index}
                  socialMedia={category.value}
                  url={window.location.href}
                  Title={newsItem.Title}
                  Hashtags={newsItem.Hashtag}
                />
              ))}
            </div>
          </div>

          <div className={classes.Description}>
            {newsItem.Category ? (
              <span>
                {newsItem.Category}:{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: newsItem.Description,
                  }}
                />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className={classes.Hashtag}>{newsItem?.Hashtag} </div>
          <div className={classes.Source}>
            {newsItem.Source && <span>{"المصدر: " + newsItem.Source}</span>}
          </div>

          <div className={classes.VideoDiv}>
            {newsItem?.YoutubeLink && !videoError ? (
              <ReactPlayer
                url={newsItem.YoutubeLink}
                className={classes.youtubeVideo}
                controls
                onError={() => setVideoError(true)}
              />
            ) : (
              ""
            )}
          </div>
          {/* Display the related news section */}
          {relatedNews?.length > 0 && (
            <div className={classes.relatedNewsDiv}>
              <h2 className={classes.relatedNewsTitle}>الأخبار المرتبطة</h2>

              <div className={classes.newsTypeSlider}>
                <ul className={classes.ul}>
                  <Slider {...newsTypesSliderSettings}>
                    {relatedNews?.map((relatedNewsItem) => (
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
                            to={`/news/${relatedNewsItem.NewsID}`}
                            className={classes.relatedNewsLink}
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          >
                            <h3 className={classes.relatedTitle}>
                              {relatedNewsItem.Title}
                            </h3>
                          </Link>
                          <p className={classes.relatedDate}>
                            {relatedNewsItem.PublishDate instanceof Date ? (
                              <TimeDifferenceComponent
                                publishDate={relatedNewsItem.PublishDate.toDate()}
                              />
                            ) : (
                              <TimeDifferenceComponent
                                publishDate={relatedNewsItem.PublishDate}
                              />
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
