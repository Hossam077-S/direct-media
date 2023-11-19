import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Slider from "react-slick";

import ReactPlayer from "react-player";
import ShareButton from "../../Components/ShareButton/ShareButtonV2";

import useStyles from "./style";
import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";
import { SuspenseFallback } from "../SuspenseFallback/SuspenseFallback";
import FirestoreContext from "../../Utils/FirestoreContext2";

const NewsDetails = () => {
  const classes = useStyles();

  const { newsData } = useContext(FirestoreContext);

  const socialMedia = [
    { value: "facebook" },
    { value: "twitter" },
    { value: "telegram" },
    { value: "whatsapp" },
  ];
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const news = newsData?.find((news) => news.id === id);

    if (news) {
      setNewsItem(news);
    } else {
      console.log("News not found");
    }

    setLoading(false);
  }, [id, newsData]);

  useEffect(() => {
    if (newsItem?.Tadmin?.length > 0) {
      // Get an array of IDs from the current newsItem's Tadmin field
      const newsIDs = newsItem.Tadmin;

      // Filter the newsData using the array of IDs from the current newsItem
      const relatedNewsItems = newsData.filter((news) =>
        newsIDs.includes(news.NewsID)
      );

      // Update the state with the filtered related news items
      setRelatedNews(relatedNewsItems);
    }
  }, [newsItem, newsData]); // Depend on newsItem and newsData

  if (loading) {
    return <SuspenseFallback cName="dots" />;
  }

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
              {socialMedia.map((category) => (
                <ShareButton
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
              <span style={{ fontFamily: "GE_SS_Two_M" }}>
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
            {newsItem.YoutubeLink ? (
              <ReactPlayer
                url={newsItem?.YoutubeLink}
                className={classes.youtubeVideo}
                controls
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
                          <a
                            href={`/news/${relatedNewsItem.id}`}
                            className={classes.relatedNewsLink}
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setRelatedNews([]);
                            }}
                          >
                            <h3 className={classes.relatedTitle}>
                              {relatedNewsItem.Title}
                            </h3>
                          </a>
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
                            {/* {relatedNewsItem.PublishDate.toDate().toLocaleDateString(
                              "ar",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )} */}
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
