import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Utils/firebase";

import {
  Container,
  Stack,
  Typography,
  IconButton,
  Skeleton,
  Slide,
  ListItemAvatar,
} from "@mui/material";

import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";

import { Avatar, Divider, List, ListItem } from "@material-ui/core";

import YouTube from "react-youtube";
import URLParse from "url-parse";

import rectangleShape from "../../assests/rect-tri.gif";
import rectangle2Shape from "../../assests/reactangle.gif";
import arrowLeft from "../../assests/arrowLeft.gif";
import arrowRight from "../../assests/arrowRight.gif";
import arrowThreeLeft from "../../assests/arrowThreeLeft.gif";
import arrowThreeRight from "../../assests/arrowThreeRight.gif";
import VideImage from "../../assests/VideImage.gif";
import PodcastBackground from "../../assests/PodcastBackground.gif";

import useStyles from "./styles";

import Slider from "react-slick";

import NewsTypeSliderItem from "./newsTypeSliderItem";

const Home = () => {
  const classes = useStyles();

  const [newsData, setNewsData] = useState([]);
  const [groupedData, setGrouppedData] = useState({});
  const [currentItem, setCurrentItem] = useState(0);
  const [currentItem2, setCurrentItem2] = useState(0);
  const [currentItem3, setCurrentItem3] = useState(0);
  const [currentItem4, setCurrentItem4] = useState(0);
  const [currentItem5, setCurrentItem5] = useState(0);
  const [currentItem6, setCurrentItem6] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const newsTypesSliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    prevArrow: (
      <img
        src={arrowThreeLeft}
        alt={"arrowThreeLeft"}
        width="14px"
        height="14px"
      />
    ),
    nextArrow: (
      <img
        src={arrowThreeRight}
        alt={"arrowThreeRight"}
        width="14px"
        height="14px"
      />
    ),
    lazyLoad: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: (
      <img
        src={arrowThreeLeft}
        alt={"arrowThreeLeft"}
        width="14px"
        height="14px"
      />
    ),
    nextArrow: (
      <img
        src={arrowThreeRight}
        alt={"arrowThreeRight"}
        width="14px"
        height="14px"
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const settings4 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const settings5 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "News"), (snapshot) => {
      const result = snapshot.docs.map((doc) => doc.data());

      const pressNews = result.filter((m) => m.Category === "صحافة");
      const localNews = result.filter((m) => m.Category === "محلي");
      const internationalNews = result.filter((m) => m.Category === "دولي");

      const numberOfItems = 5;

      const groupedPressNews = [];
      while (pressNews.length > 0) {
        groupedPressNews.push(pressNews.splice(0, numberOfItems));
      }

      const groupedLocalNews = [];
      while (localNews.length > 0) {
        groupedLocalNews.push(localNews.splice(0, numberOfItems));
      }

      const groupedInternationalNews = [];
      while (internationalNews.length > 0) {
        groupedInternationalNews.push(
          internationalNews.splice(0, numberOfItems)
        );
      }

      setGrouppedData({
        press: groupedPressNews,
        local: groupedLocalNews,
        inter: groupedInternationalNews,
      });
      console.info("Groupped Data: ", groupedPressNews);

      setNewsData(result);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   let interval, interval3;
  //   if (newsData.length > 0) {
  //     const latestNewsIndex = newsData.length - 1;
  //     setCurrentItem2(latestNewsIndex);

  //     interval = setInterval(() => {
  //       setCurrentItem((prevItem) => (prevItem + 1) % newsData.length);
  //     }, 8000);

  //     interval3 = setInterval(() => {
  //       setCurrentItem3((prevItem) => (prevItem + 1) % newsData.length);
  //     }, 8000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //     clearInterval(interval3);
  //   };
  // }, [newsData]);

  useEffect(() => {
    const videoUrl = newsData[currentItem2]?.YoutubeLink;
    if (videoUrl) {
      const url = new URLParse(videoUrl, true);
      const id = url.query.v;
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [newsData, currentItem2]);

  const handleNext = (setter) => {
    const maxIndex = newsData.length - 1;
    setter((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrevious = (setter) => {
    const maxIndex = newsData.length - 1;
    setter((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }

    const truncatedText = description.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(" ");

    return `${truncatedText.slice(0, lastSpaceIndex)}`;
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const localNews = newsData.filter((newsItem) => newsItem.Category === "محلي");
  const currentNewsItem = localNews[currentItem4];

  return (
    <>
      <Container className={classes.container}>
        {/* Latest News */}
        <div className={classes.slicerDiv}>
          <Stack direction="row" alignItems="center">
            <div className={classes.arrowDiv}>
              <IconButton
                onClick={() => handlePrevious(setCurrentItem)}
                disabled={newsData.length === 0}
                className={classes.upButton}
              >
                <BsArrowUpCircleFill style={{ fontSize: "18px" }} />
              </IconButton>
              <IconButton
                onClick={() => handleNext(setCurrentItem)}
                disabled={newsData.length === 0}
                className={classes.downButton}
              >
                <BsArrowDownCircleFill style={{ fontSize: "18px" }} />
              </IconButton>
            </div>
            {newsData.length > 0 ? (
              newsData.map((newsItem, index) =>
                index === currentItem ? (
                  <div key={index} className={classes.newsDiv}>
                    <Slide
                      in={true}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(true ? { timeout: 1500 } : {})}
                    >
                      <Typography className={classes.typoTitle}>
                        ... {newsItem.Title} -{" "}
                        {truncateDescription(newsItem.Description, 50)}
                      </Typography>
                    </Slide>
                  </div>
                ) : null
              )
            ) : (
              <div className={classes.newsDiv}>
                <Skeleton
                  variant="text"
                  sx={{
                    fontSize: "25px",
                    marginLeft: "10%",
                    marginRight: "1%",
                  }}
                />
              </div>
            )}
            <div className={classes.imageDiv}>
              <Typography className={classes.imageTitle}>آخرالأخبار</Typography>
              <img
                src={rectangleShape}
                alt="rect-shap"
                width="157px"
                height="43px"
              />
            </div>
          </Stack>
        </div>

        {/* First Slider + Video */}
        <Stack
          direction="row"
          spacing={3.2}
          className={classes.gridSlidersContainer}
        >
          {/* Part_2 */}

          <Stack direction="column" spacing={2}>
            {/* Render the image slider */}
            <div className={classes.imageDiv2}>
              <Typography className={classes.imageTitle2}>
                قضية بدقيقة
              </Typography>
              <img
                src={rectangle2Shape}
                alt="rectangleShape"
                width="204px"
                height="44px"
              />
            </div>
            {/* Render the news Videos slider */}
            {newsData.length > 0 ? (
              <div className={classes.newsDiv}>
                <YouTube videoId={videoId} className={classes.youtubeVideo} />
              </div>
            ) : (
              <div className={classes.newsDiv}>
                <Skeleton variant="rectangular" height="364px" />
              </div>
            )}
          </Stack>

          {/* Render the News images slider */}

          {/* Error here need to fix all slider in the website */}
          {newsData.length > 0 ? (
            <div className={classes.newsImageDiv}>
              <IconButton
                onClick={() => handlePrevious(setCurrentItem3)}
                disabled={newsData.length === 0}
                className={classes.arrowLeft}
              >
                <img src={arrowLeft} alt="arrowLeft" />
              </IconButton>
              <Slider {...settings3}>
                {newsData.map((newsItem, index) =>
                  index === currentItem3 ? (
                    <div key={index} className={classes.sliderItem}>
                      <>
                        <img
                          src={newsItem.ImageURL}
                          alt={newsItem.Title}
                          width="642px"
                          height="425px"
                          className={classes.newsImage}
                        />
                        <>
                          <Divider
                            orientation="vertical"
                            flexItem
                            className={classes.SliderDivider}
                          />
                          <div className={classes.sliderContent}>
                            <Typography
                              gutterBottom
                              className={classes.sliderNewsTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                            <Typography
                              variant="body1"
                              gutterBottom
                              className={classes.sliderNewsDescription}
                            >
                              {newsItem.Description}
                            </Typography>
                          </div>
                        </>
                      </>
                    </div>
                  ) : null
                )}
              </Slider>
              <IconButton
                onClick={() => handleNext(setCurrentItem3)}
                disabled={newsData.length === 0}
                className={classes.arrowRight}
              >
                <img src={arrowRight} alt="arrowRight" />
              </IconButton>
            </div>
          ) : (
            <div className={classes.newsDiv}>
              <Skeleton variant="rectangular" height="425px" />
            </div>
          )}
        </Stack>

        {/* Ads */}
        <div className={classes.adsContainer}>
          <Typography className={classes.adsText}>
            إعــــــــــــــــــــــلان
          </Typography>
        </div>

        {/* Programs */}
        <div className={classes.programContainer}>
          <div className={classes.programHeader}>
            <Divider
              orientation="horizontal"
              flexItem
              className={classes.programDivider}
            />
            <Typography className={classes.programText}>البرامج</Typography>
          </div>
          <div className={classes.programSlider}>
            {newsData.length > 0 ? (
              <div className={classes.programItems}>
                <Slider {...settings}>
                  {newsData.map((newsItem, index) => (
                    <img
                      key={index}
                      src={newsItem.ImageURL}
                      alt={newsItem.Title}
                      className={classes.programImage}
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                No programs available.
              </Typography>
            )}
          </div>
          <div className={classes.newsTypesHeader}>
            <div className={classes.headerDiv}>
              <div className={classes.globalHeaderDiv}>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider}
                />
                <Typography className={classes.globalText}>دولي</Typography>
              </div>
              <div className={classes.newsTypeSlider}>
                {groupedData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.inter.map((newsItem, index) => (
                      <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                    ))}
                  </Slider>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No news available.
                  </Typography>
                )}
              </div>
            </div>
            <div className={classes.headerDiv}>
              <div className={classes.globalHeaderDiv}>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider2}
                />
                <Typography className={classes.globalText}>صحافة</Typography>
              </div>
              <div className={classes.newsTypeSlider}>
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.press.map((newsItem, index) => (
                      <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                    ))}
                  </Slider>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No news available.
                  </Typography>
                )}
              </div>
            </div>
            <div className={classes.headerDiv}>
              <div className={classes.globalHeaderDiv}>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider}
                />
                <Typography className={classes.globalText}>محلي</Typography>
              </div>
              <div className={classes.newsTypeSlider}>
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.local.map((newsItem, index) => (
                      <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                    ))}
                  </Slider>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No news available.
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* News Type Sliders */}
      <div className={classes.containerDiv2}>
        <Container className={classes.container2}>
          <Stack
            direction="row"
            spacing={4}
            // className={classes.gridSlidersContainer2}
          >
            <Stack
              direction="column"
              spacing={2}
              className={classes.articlStack}
            >
              <div className={classes.articlDivTitle}>
                <Typography className={classes.articlTitleHeader}>
                  مقالات وتحقيقات
                </Typography>
                <Typography className={classes.articlTitleParg}>
                  كتّاب المنصّة
                </Typography>
              </div>
              {newsData.length > 0 ? (
                <div className={classes.articlContentDiv}>
                  <div className={classes.articlImage_Divider}>
                    <List className={classes.newsList}>
                      {newsData.slice(0, 4).map((newsItem, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            className={`${classes.newsListItem} ${
                              index === hoverIndex ? classes.activeListItem : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className={classes.newsItemContent}>
                              {index >= 0 && (
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  className={`${classes.articlDivider} ${
                                    index === hoverIndex
                                      ? classes.activeDivider
                                      : ""
                                  }`}
                                />
                              )}
                              <ListItemAvatar>
                                <Avatar
                                  alt={newsItem.Title}
                                  src={newsItem.ImageURL}
                                  className={classes.newsAvatar}
                                />
                              </ListItemAvatar>
                              <div className={classes.descriptionContent}>
                                <div className={classes.newsItemTitle}>
                                  {newsItem.Title}
                                </div>
                                <div className={classes.newsItemDescription}>
                                  <span>حسام</span>
                                  <span
                                    style={{
                                      fontSize: "30px",
                                      paddingLeft: "  5px",
                                    }}
                                  >
                                    ,,
                                  </span>
                                </div>
                              </div>
                            </div>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </div>
                  {/* <div className={classes.articlDescription_Name}></div> */}
                </div>
              ) : (
                <div>
                  <Skeleton variant="rectangular" height="364px" />
                </div>
              )}
            </Stack>
            {newsData.length > 0 ? (
              <div>
                <div className={classes.articlImageDiv}>
                  <IconButton
                    onClick={() => handlePrevious(setCurrentItem3)}
                    disabled={newsData.length === 0}
                    className={classes.arrowLeft}
                  >
                    <img src={arrowLeft} alt="arrowLeft" />
                  </IconButton>
                  {newsData.map((newsItem, index) =>
                    index === currentItem3 ? (
                      <div key={index}>
                        <>
                          <img
                            src={newsItem.ImageURL}
                            alt={newsItem.Title}
                            width="527px"
                            height="319px"
                            className={classes.newsImage}
                          />
                          <div className={classes.title_dividerArticl}>
                            <Typography
                              gutterBottom
                              className={classes.sliderArticlTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                            <Divider
                              orientation="vertical"
                              flexItem
                              className={classes.articlSliderDivider}
                            />
                          </div>
                        </>
                      </div>
                    ) : null
                  )}
                  <IconButton
                    onClick={() => handleNext(setCurrentItem3)}
                    disabled={newsData.length === 0}
                    className={classes.arrowRight}
                  >
                    <img src={arrowRight} alt="arrowRight" />
                  </IconButton>
                </div>
                <div className={classes.threeNewsContainer}>
                  <div className={classes.newsThreeSlider}>
                    {currentNewsItem && (
                      <div className={classes.threeSlidersContainer}>
                        <div className={classes.ThreeSlider}>
                          <img
                            src={currentNewsItem.ImageURL}
                            alt={currentNewsItem.Title}
                            width="160px"
                            height="121px"
                            className={classes.newsImage}
                          />
                          <div
                            className={classes.title_description_threeSlider}
                          >
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeTitle}
                            >
                              {currentNewsItem.Title}
                            </Typography>
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeDescription}
                            >
                              {currentNewsItem.Description}
                            </Typography>
                          </div>
                          <IconButton
                            onClick={() => handlePrevious(setCurrentItem4)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeLeft}
                          >
                            <img
                              src={arrowThreeLeft}
                              alt={currentNewsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleNext(setCurrentItem4)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeRight}
                          >
                            <img
                              src={arrowThreeRight}
                              alt={currentNewsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                        </div>
                      </div>
                    )}
                    {newsData.map((newsItem, index) =>
                      index === currentItem5 ? (
                        <div key={index} className={classes.ThreeSlider}>
                          <img
                            src={newsItem.ImageURL}
                            alt={newsItem.Title}
                            width="160px"
                            height="121px"
                            className={classes.newsImage}
                          />
                          <div
                            className={classes.title_description_threeSlider}
                          >
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeDescription}
                            >
                              {newsItem.Description}
                            </Typography>
                          </div>
                          <IconButton
                            onClick={() => handlePrevious(setCurrentItem5)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeLeft}
                          >
                            <img
                              src={arrowThreeLeft}
                              alt={newsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleNext(setCurrentItem5)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeRight}
                          >
                            <img
                              src={arrowThreeRight}
                              alt={newsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                        </div>
                      ) : null
                    )}
                    {newsData.map((newsItem, index) =>
                      index === currentItem6 ? (
                        <div className={classes.ThreeSlider}>
                          <img
                            src={newsItem.ImageURL}
                            alt={newsItem.Title}
                            width="160px"
                            height="121px"
                            className={classes.newsImage}
                          />
                          <div
                            className={classes.title_description_threeSlider}
                          >
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                            <Typography
                              gutterBottom
                              className={classes.sliderThreeDescription}
                            >
                              {newsItem.Description}
                            </Typography>
                          </div>
                          <IconButton
                            onClick={() => handlePrevious(setCurrentItem6)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeLeft}
                          >
                            <img
                              src={arrowThreeLeft}
                              alt={newsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleNext(setCurrentItem6)}
                            disabled={newsData.length === 0}
                            className={classes.arrowThreeRight}
                          >
                            <img
                              src={arrowThreeRight}
                              alt={newsItem.Title}
                              width="20px"
                              height="20px"
                            />
                          </IconButton>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={classes.newsDiv}>
                <Skeleton variant="rectangular" height="633px" />
              </div>
            )}
          </Stack>
        </Container>
      </div>

      <Container className={classes.containerDiv3}>
        {" "}
        <div className={classes.videoImageDiv}>
          <img src={VideImage} alt="Video" />
        </div>
      </Container>

      <Container className={classes.containerDiv4}>
        <div className={classes.writerContainer}>
          <div className={classes.writerHeader}>
            <Divider
              orientation="horizontal"
              flexItem
              className={classes.writerDivider}
            />
            <Typography className={classes.writerText}>الكتاب</Typography>
          </div>

          <div className={classes.writerDetails}>
            {newsData.length > 0 ? (
              <div className={classes.writerItems}>
                <Slider {...settings4}>
                  {newsData.map((newsItem, index) => (
                    <div key={index}>
                      <img
                        src={newsItem.ImageURL}
                        alt={newsItem.Title}
                        className={classes.writerImage}
                      />
                      <Typography
                        variant="body1"
                        className={classes.writerTitle}
                      >
                        {newsItem.Title}
                      </Typography>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                No programs available.
              </Typography>
            )}
          </div>
        </div>
      </Container>

      <Container className={classes.containerDiv5}>
        <div className={classes.podcastDiv}>
          <img src={PodcastBackground} alt="Video" />
        </div>
      </Container>

      <Container className={classes.containerDiv6}>
        <div className={classes.podcastContainer}>
          <div className={classes.podcastHeader}>
            <Divider
              orientation="horizontal"
              flexItem
              className={classes.podcastDivider}
            />
            <Typography className={classes.podcastText}>بودكاست</Typography>
          </div>
          <div className={classes.podcastMediaHeader}>
            {newsData.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...settings5}>
                  {newsData.map((newsItem, index) => (
                    <img
                      key={index}
                      src={newsItem.ImageURL}
                      alt={newsItem.Title}
                      className={classes.podcastMediaImage}
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                No programs available.
              </Typography>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
