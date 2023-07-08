import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Utils/firebase";

import {
  Container,
  Stack,
  Typography,
  Skeleton,
  ListItemAvatar,
} from "@mui/material";

import { Avatar, Divider, List, ListItem } from "@material-ui/core";

import YouTube from "react-youtube";
import URLParse from "url-parse";

import rectangleShape from "../../assests/rect-tri.gif";
import rectangle2Shape from "../../assests/reactangle.gif";
import arrowINup from "../../assests/arrowINup.gif";
import arrowINdown from "../../assests/arrowINdown.gif";
import arrowLeft from "../../assests/arrowLeft.gif";
import arrowRight from "../../assests/arrowRight.gif";
import arrowThreeLeft from "../../assests/arrowThreeLeft.gif";
import arrowThreeRight from "../../assests/arrowThreeRight.gif";
import VideImage from "../../assests/VideImage.gif";
import PodcastBackground from "../../assests/PodcastBackground.gif";

import useStyles from "./styles";

import Slider from "react-slick";

import NewsTypeSliderItem from "./newsTypeSliderItem";
import ThreeSliderComponentItem from "./ThreeSliderComponentItem";

const Home = () => {
  const classes = useStyles();

  const [newsData, setNewsData] = useState([]);
  const [programsData, setProgramsData] = useState([]);

  const [groupedData, setGrouppedData] = useState({});
  const [groupedProgramsData, setGrouppedProgramsData] = useState({});

  const [videoId, setVideoId] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const importantNew = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    prevArrow: <img src={arrowINup} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowINdown} alt={"arrowLeft"} />,
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
  const allNewsSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    prevArrow: <img src={arrowLeft} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowRight} alt={"arrowLeft"} />,
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
  const programSettings = {
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
    slidesToShow: 1,
    slidesToScroll: 1,
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
  const threeTypeSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <img src={arrowThreeLeft} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowThreeRight} alt={"arrowLeft"} />,
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

  // Getting Data from firebase
  useEffect(() => {
    const unsubscribeNews = onSnapshot(collection(db, "News"), (snapshot) => {
      const result = snapshot.docs.map((doc) => doc.data());

      const ImportantNews = result.filter((m) => m.Category === "خبر عاجل");
      const pressNews = result.filter((m) => m.Category === "صحافة");
      const localNews = result.filter((m) => m.Category === "محلي");
      const internationalNews = result.filter((m) => m.Category === "دولي");

      const numberOfItems = 5;

      const groupedImportantNews = [...ImportantNews];

      const groupedPressNews2 = [...pressNews];

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
        press2: groupedPressNews2,
        local: groupedLocalNews,
        inter: groupedInternationalNews,
        important: groupedImportantNews,
      });

      setNewsData(result);
    });

    const unsubscribeProgrames = onSnapshot(
      collection(db, "Programs"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => doc.data());

        const CaseInOne = result.filter((m) => m.Title === "قضية بدقيقة");

        const groupedCaseProgrames = [...CaseInOne];

        setGrouppedProgramsData({
          programs: groupedCaseProgrames,
        });

        setProgramsData(result);
      }
    );

    return () => {
      // UnsubscribeNews from the snapshot listener when the component unmounts
      unsubscribeNews();
      unsubscribeProgrames();
    };
  }, []);

  // Getting latest video url for the programes
  useEffect(() => {
    if (!groupedProgramsData || !groupedProgramsData.programs) {
      return;
    }

    const sortedPrograms = [...groupedProgramsData.programs].sort((a, b) => {
      return new Date(b.PublishDate) - new Date(a.PublishDate);
    });

    const latestProgram = sortedPrograms[0];
    let videoUrl = null;

    if (latestProgram) {
      videoUrl = latestProgram.YoutubeUrl;
    }

    if (videoUrl) {
      const url = new URLParse(videoUrl, true);
      const id = url.query.v;
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [groupedProgramsData]);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <>
      <Container className={classes.container}>
        {/* Latest News */}
        <div className={classes.slicerDiv}>
          <Stack direction="row" alignItems="center">
            {Object.keys(groupedData).length > 0 ? (
              <div className={classes.importantNewsDiv}>
                <Slider {...importantNew}>
                  {groupedData.important.map((newsItem, index) => (
                    <div
                      key={index}
                      className={classes.importantNewsSliderItem}
                    >
                      <Typography key={index} className={classes.typoTitle}>
                        {newsItem.Title}
                      </Typography>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={classes.importantNewSkeleton}>
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
            {Object.keys(groupedProgramsData).length > 0 ? (
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
          {newsData.length > 0 ? (
            <div className={classes.newsImageDiv}>
              <Slider {...allNewsSlider}>
                {newsData.map((newsItem, index) => (
                  <div key={index} className={classes.sliderItem}>
                    <>
                      <img
                        src={newsItem.ImageURL}
                        alt={newsItem.Title}
                        width="642px"
                        height="425px"
                        className={classes.newsImage}
                      />
                      <div className={classes.sliderDetailsDiv}>
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
                        <Divider
                          orientation="vertical"
                          flexItem
                          className={classes.SliderDivider}
                        />
                      </div>
                    </>
                  </div>
                ))}
              </Slider>
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
            {programsData.length > 0 ? (
              <div className={classes.programItems}>
                <Slider {...programSettings}>
                  {programsData.map((newsItem, index) => (
                    <img
                      key={index}
                      src={newsItem["Image URL"]}
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
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.inter.map((newsItem, index) => (
                      <div>
                        <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                      </div>
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
          <Stack direction="row" spacing={4}>
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
              {/* Need fix the background */}
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
                  {/* Need Just filter */}
                  <Slider {...allNewsSlider}>
                    {newsData.map((newsItem, index) => (
                      <div key={index} className={classes.sliderItem}>
                        <>
                          <img
                            src={newsItem.ImageURL}
                            alt={newsItem.Title}
                            width="527px"
                            height="319px"
                            className={classes.newsImage}
                          />
                          <div className={classes.sliderDetailsDiv2}>
                            <div className={classes.title_dividerArticl}>
                              <Typography
                                gutterBottom
                                className={classes.sliderArticlTitle}
                              >
                                {newsItem.Title}
                              </Typography>
                            </div>
                            <Divider
                              orientation="vertical"
                              flexItem
                              className={classes.articlSliderDivider}
                            />
                          </div>
                        </>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className={classes.threeNewsContainer}>
                  <div className={classes.newsThreeSlider}>
                    {/* Need Filter also */}
                    <Slider {...threeTypeSlider}>
                      {groupedData.press2.map((newsItem, index) => (
                        <ThreeSliderComponentItem
                          index={index}
                          item={newsItem}
                        />
                      ))}
                    </Slider>
                  </div>
                  <div className={classes.newsThreeSlider}>
                    <Slider {...threeTypeSlider}>
                      {newsData.map((newsItem, index) => (
                        <ThreeSliderComponentItem
                          index={index}
                          item={newsItem}
                        />
                      ))}
                    </Slider>
                  </div>
                  <div className={classes.newsThreeSlider}>
                    <Slider {...threeTypeSlider}>
                      {newsData.map((newsItem, index) => (
                        <ThreeSliderComponentItem
                          index={index}
                          item={newsItem}
                        />
                      ))}
                    </Slider>
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
