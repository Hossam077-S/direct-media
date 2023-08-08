import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  db,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "../../Utils/firebase";

import {
  Container,
  Stack,
  Typography,
  Skeleton,
  ListItemAvatar,
} from "@mui/material";

import { Avatar, Divider, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

import ReactPlayer from "react-player";

import rectangleShape from "../../assests/rect-tri.gif";
import rectangle2Shape from "../../assests/reactangle.gif";
import arrowINup from "../../assests/arrowINup.gif";
import arrowINdown from "../../assests/arrowINdown.gif";
import arrowLeft from "../../assests/arrowLeft.gif";
import arrowRight from "../../assests/arrowRight.gif";
import arrowThreeLeft from "../../assests/arrowThreeLeft.gif";
import arrowThreeRight from "../../assests/arrowThreeRight.gif";
import PodcastBackground from "../../assests/PodcastBackground.gif";

import videoDirectMedia from "../../assests/DirectMediaVideo.mp4";

import useStyles from "./styles";

import Slider from "react-slick";
import Dotdotdot from "react-dotdotdot";

import NewsTypeSliderItem from "./newsTypeSliderItem";
import ThreeSliderComponentItem from "./ThreeSliderComponentItem";

const Home = () => {
  const classes = useStyles();

  // const [newsData, setNewsData] = useState([]);
  const [programsData, setProgramsData] = useState([]);
  const [writersData, setWritersData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [podcastData, setPodcastData] = useState([]);

  const [groupedData, setGrouppedData] = useState({
    press: [],
    press2: [],
    local: [],
    local2: [],
    inter: [],
    inter2: [],
    important: [],
  });

  const [groupedProgramsData, setGrouppedProgramsData] = useState({});

  const [hoverIndex, setHoverIndex] = useState(-1);

  const [latestProgram, setLatestProgram] = useState(null);

  // const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const importantNew = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    pauseOnHover: true,
    verticalSwiping: true,
    autoplay: true,
    rtl: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <img src={arrowINup} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowINdown} alt={"arrowLeft"} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };
  const allNewsSlider = {
    dots: false,
    infinite: true,
    speed: 1500,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    autoplaySpeed: 8000,
    arrows: true,
    prevArrow: <img src={arrowLeft} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowRight} alt={"arrowLeft"} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    speed: 1200,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    pauseOnHover: true,
    rtl: true,
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
          slidesToShow: 1,
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
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    rtl: true,
    pauseOnHover: true,
    prevArrow: <img src={arrowThreeLeft} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowThreeRight} alt={"arrowLeft"} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
  const writersSettings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: true,
    pauseOnHover: true,
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
  const podcastSettings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    rtl: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
    // const unsubscribeNews = onSnapshot(collection(db, "News"), (snapshot) => {
    //   const result = snapshot.docs.map((doc) => {
    //     const x = doc.data();
    //     x.id = doc.id;
    //     return x;
    //   });

    //   const ImportantNews = result.filter((m) => m.Category === "خبر عاجل");
    //   const pressNews = result.filter((m) => m.Category === "صحافة");
    //   const localNews = result.filter((m) => m.Category === "محلي");
    //   const internationalNews = result.filter((m) => m.Category === "دولي");

    //   const numberOfItems = 5;

    //   const groupedImportantNews = [...ImportantNews];

    //   const groupedPressNews2 = [...pressNews];

    //   const groupedLocalNews2 = [...localNews];

    //   const groupedInternationalNews2 = [...internationalNews];

    //   const groupedPressNews = [];
    //   while (pressNews.length > 0) {
    //     groupedPressNews.push(pressNews.splice(0, numberOfItems));
    //   }

    //   const groupedLocalNews = [];
    //   while (localNews.length > 0) {
    //     groupedLocalNews.push(localNews.splice(0, numberOfItems));
    //   }

    //   const groupedInternationalNews = [];
    //   while (internationalNews.length > 0) {
    //     groupedInternationalNews.push(
    //       internationalNews.splice(0, numberOfItems)
    //     );
    //   }

    //   setGrouppedData({
    //     press: groupedPressNews,
    //     press2: groupedPressNews2,
    //     local: groupedLocalNews,
    //     local2: groupedLocalNews2,
    //     inter: groupedInternationalNews,
    //     inter2: groupedInternationalNews2,
    //     important: groupedImportantNews,
    //   });

    //   setNewsData(result);
    // });

    const unsubscribeProgrames = onSnapshot(
      collection(db, "Programs"),
      async (snapshot) => {
        const programsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });

        const CaseInOneProgram = programsData.filter(
          (m) => m.Title === "قضية بدقيقة"
        );

        if (CaseInOneProgram) {
          const programsIDArray = CaseInOneProgram[0]?.ProgramsID || [];

          // Create a query to fetch episodes with matching IDs
          if (programsIDArray.length > 0) {
            const q = query(
              collection(db, "ProgramsEpisodes"),
              where("EpisodeID", "in", programsIDArray)
            );

            const querySnapshot = await getDocs(q);

            // Extract the episode data from the query snapshot
            const episodes = querySnapshot.docs.map((doc) => doc.data());

            setGrouppedProgramsData({
              programs: episodes,
            });
          }
        }
        setProgramsData(programsData);
      }
    );

    const unsubscribeWriters = onSnapshot(
      collection(db, "Writers"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });

        setWritersData(result);
      }
    );
    const unsubscribeArticles = onSnapshot(
      collection(db, "Articles"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });
        setArticlesData(result);
      }
    );

    const unsubscribePodcast = onSnapshot(
      collection(db, "PodcastEpisodes"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });
        setPodcastData(result);
      }
    );

    return () => {
      // UnsubscribeNews from the snapshot listener when the component unmounts
      // unsubscribeNews();
      unsubscribeProgrames();
      unsubscribeWriters();
      unsubscribeArticles();
      unsubscribePodcast();
    };
  }, []);

  useEffect(() => {
    const sortedPrograms = groupedProgramsData.programs?.sort((a, b) => {
      return new Date(a.PublishDate) - new Date(b.PublishDate);
    });

    const latestProgram = sortedPrograms?.[sortedPrograms.length - 1];
    setLatestProgram(latestProgram);
  }, [groupedProgramsData]);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  // const handlePlay = (index) => {
  //   if (currentPlayingIndex === index) {
  //     // Clicked on the currently playing video, pause it
  //     setCurrentPlayingIndex(null);
  //   } else {
  //     // Clicked on a new video, stop the currently playing video and play the new one
  //     setCurrentPlayingIndex(index);
  //   }
  // };

  const getTimeDifferenceString = (publishDate) => {
    const currentTime = new Date();
    const timeDifference = currentTime - publishDate;
    const minutesDifference = Math.round(timeDifference / (1000 * 60));
    const hoursDifference = Math.round(minutesDifference / 60);

    if (hoursDifference >= 24) {
      return publishDate.toDate().toLocaleDateString("ar", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    } else if (hoursDifference >= 1) {
      return `منذ ${hoursDifference} ساعة`;
    } else {
      return `منذ ${minutesDifference} دقيقة`;
    }
  };

  const fetchNewsData = async () => {
    const querySnapshot = await getDocs(collection(db, "News"));

    const result = querySnapshot.docs.map((doc) => {
      const x = doc.data();
      x.id = doc.id;
      return x;
    });

    const ImportantNews = result.filter((m) => m.Category === "خبر عاجل");
    const pressNews = result.filter((m) => m.Category === "صحافة");
    const localNews = result.filter((m) => m.Category === "محلي");
    const internationalNews = result.filter((m) => m.Category === "دولي");

    const numberOfItems = 5;

    const groupedImportantNews = [...ImportantNews];

    const groupedPressNews2 = [...pressNews];

    const groupedLocalNews2 = [...localNews];

    const groupedInternationalNews2 = [...internationalNews];

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
      groupedInternationalNews.push(internationalNews.splice(0, numberOfItems));
    }

    setGrouppedData({
      press: groupedPressNews,
      press2: groupedPressNews2,
      local: groupedLocalNews,
      local2: groupedLocalNews2,
      inter: groupedInternationalNews,
      inter2: groupedInternationalNews2,
      important: groupedImportantNews,
    });

    return result; // Return the result for the useQuery data
  };

  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery("news", fetchNewsData);

  // Handle loading and error states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data!</p>;
  }

  return (
    <>
      <Container className={classes.container}>
        {/* Latest News */}
        <div id="latest-news" className={classes.slicerDiv}>
          <Stack direction="row" alignItems="center">
            <div className={classes.imageDiv}>
              <Typography className={classes.imageTitle}>آخرالأخبار</Typography>
              <img
                src={rectangleShape}
                alt="rect-shap"
                className={classes.ImportantNewsImage}
              />
            </div>
            {Object.keys(groupedData).length > 0 ? (
              <div className={classes.importantNewsDiv}>
                <Slider {...importantNew}>
                  {groupedData.important.map((newsItem, index) => (
                    <div
                      key={index}
                      className={classes.importantNewsSliderItem}
                    >
                      <Link
                        to={"news/" + newsItem.id}
                        className={classes.LinkInnerPages}
                      >
                        <Typography key={index} className={classes.typoTitle}>
                          <Dotdotdot clamp={2}>{newsItem.Title}</Dotdotdot>
                        </Typography>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={classes.importantNewSkeletonDiv}>
                <Skeleton
                  variant="text"
                  className={classes.importantNewSkeleton}
                />
              </div>
            )}
          </Stack>
        </div>

        {/* First Slider */}
        <Stack direction="row" className={classes.gridSlidersContainer}>
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
                        className={classes.allnewsImage}
                      />
                      <div className={classes.sliderDetailsDiv}>
                        <Divider
                          orientation="vertical"
                          flexItem
                          className={classes.SliderDivider}
                        />
                        <div className={classes.sliderContent}>
                          <Link
                            to={"news/" + newsItem.id}
                            className={classes.LinkInnerPages}
                          >
                            <Typography
                              gutterBottom
                              className={classes.sliderNewsTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                          </Link>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={classes.sliderNewsDescription}
                          >
                            <Dotdotdot clamp={2}>
                              {newsItem.Description}
                            </Dotdotdot>
                          </Typography>
                          <Typography className={classes.sliderArticlDate}>
                            {newsItem.PublishDate instanceof Date
                              ? getTimeDifferenceString(
                                  newsItem.PublishDate.toDate()
                                )
                              : getTimeDifferenceString(newsItem.PublishDate)}
                          </Typography>
                        </div>
                      </div>
                    </>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div>
              <Skeleton
                className={classes.skeletonSlider}
                variant="rectangular"
              />
            </div>
          )}
          <Stack direction="column" spacing={2} className={classes.videoStack}>
            {/* Render Video */}
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
              <div>
                <div className={classes.VideoDiv}>
                  <ReactPlayer
                    url={latestProgram?.YoutubeLink}
                    className={classes.youtubeVideo}
                  />
                </div>
              </div>
            ) : (
              <div>
                <Skeleton variant="rectangular" height="364px" />
              </div>
            )}
          </Stack>
        </Stack>

        {/* Ads */}
        <div className={classes.adsContainer}>
          <Typography className={classes.adsText}>
            إعــــــــــــــــــــــلان
          </Typography>
        </div>

        {/* Programs & ThreeSlider */}
        <div id="programs" className={classes.programContainer}>
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
                    <Link
                      to={"programs/" + newsItem.id}
                      className={classes.LinkInnerPages}
                      key={index}
                    >
                      <img
                        key={index}
                        src={newsItem["Image URL"]}
                        alt={newsItem.Title}
                        className={classes.programImage}
                      />
                    </Link>
                  ))}
                </Slider>
              </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                No programs available.
              </Typography>
            )}
          </div>
          <div id="news" className={classes.newsTypesHeader}>
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
                      <div key={index}>
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
                <Typography className={classes.globalText}>صحافة</Typography>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider2}
                />
              </div>
              <div className={classes.newsTypeSlider}>
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.press.map((newsItem, index) => (
                      <div key={index}>
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
                <Typography className={classes.globalText}>دولي</Typography>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider}
                />
              </div>
              <div className={classes.newsTypeSlider}>
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.inter.map((newsItem, index) => (
                      <div key={index}>
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
          </div>
        </div>
      </Container>

      {/* News Type Sliders & Articles*/}
      <div className={classes.containerDiv2}>
        <Container className={classes.container2}>
          <Stack direction="row" spacing={4}>
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
                            className={classes.articleContentnewsImage}
                          />
                          <div className={classes.sliderDetailsDiv2}>
                            <div className={classes.title_dividerArticl}>
                              <Link
                                to={"news/" + newsItem.id}
                                className={classes.LinkInnerPages}
                              >
                                <Typography
                                  className={classes.sliderArticlTitle}
                                >
                                  {newsItem.Title}
                                </Typography>
                              </Link>
                              <Typography className={classes.sliderArticlDate}>
                                {newsItem.PublishDate instanceof Date
                                  ? newsItem.PublishDate.toLocaleDateString(
                                      "ar",
                                      {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                      }
                                    )
                                  : newsItem.PublishDate.toDate().toLocaleDateString(
                                      "ar",
                                      {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                      }
                                    )}
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
                    <Slider {...threeTypeSlider}>
                      {groupedData.press2.map((newsItem, index) => (
                        <div key={index}>
                          <ThreeSliderComponentItem
                            index={index}
                            item={newsItem}
                            id={newsItem.id}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className={classes.newsThreeSlider}>
                    <Slider {...threeTypeSlider}>
                      {groupedData.local2.map((newsItem, index) => (
                        <div key={index}>
                          <ThreeSliderComponentItem
                            index={index}
                            item={newsItem}
                            id={newsItem.id}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className={classes.newsThreeSlider}>
                    <Slider {...threeTypeSlider}>
                      {groupedData.inter2.map((newsItem, index) => (
                        <div key={index}>
                          <ThreeSliderComponentItem
                            index={index}
                            item={newsItem}
                            id={newsItem.id}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Skeleton
                  variant="rectangular"
                  className={classes.SkeletonNews2}
                />
              </div>
            )}
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
              {Object.keys(writersData).length > 0 ? (
                <div className={classes.articlContentDiv}>
                  <div className={classes.articlImage_Divider}>
                    <List className={classes.newsList}>
                      {writersData.slice(0, 4).map((writerItem, index) => (
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
                              <div className={classes.descriptionContent}>
                                <div className={classes.newsItemTitle}>
                                  {articlesData.map((articleItem, index) => {
                                    const articleID =
                                      writerItem.ArticleID[
                                        writerItem.ArticleID.length - 1
                                      ];
                                    if (articleItem.ArticleID === articleID) {
                                      return (
                                        <Link
                                          to={"article/" + articleItem.id}
                                          state={writerItem}
                                          className={classes.LinkInnerPages}
                                          key={index}
                                        >
                                          <Typography
                                            key={index}
                                            className={classes.articleContent}
                                          >
                                            <Dotdotdot clamp={2}>
                                              {articleItem.Text}
                                            </Dotdotdot>
                                          </Typography>
                                        </Link>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                                <div className={classes.newsItemDescription}>
                                  <span
                                    style={{
                                      fontSize: "30px",
                                      paddingLeft: "  5px",
                                    }}
                                  >
                                    ,,
                                  </span>
                                  <span>{writerItem.Name}</span>
                                </div>
                              </div>

                              <ListItemAvatar>
                                <Avatar
                                  alt={writerItem.Title}
                                  src={writerItem.ProfileImage}
                                  className={classes.newsAvatar}
                                />
                              </ListItemAvatar>
                            </div>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  </div>
                </div>
              ) : (
                <div>
                  <Skeleton variant="rectangular" height="364px" />
                </div>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>

      <Container className={classes.containerDiv3}>
        {" "}
        <div className={classes.videoImageDiv}>
          <video
            src={videoDirectMedia}
            type="video/mp4"
            alt="Video"
            className={classes.videoImage}
            loop={true}
            autoPlay={true}
            muted // Add the muted attribute
          />
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
            {writersData.length > 0 ? (
              <div className={classes.writerItems}>
                <Slider {...writersSettings}>
                  {writersData.map((newsItem, index) => (
                    <div key={index}>
                      <img
                        src={newsItem.ProfileImage}
                        alt={newsItem.Title}
                        className={classes.writerImage}
                      />
                      <Link
                        to={"writer/" + newsItem.id}
                        className={classes.LinkInnerPages}
                      >
                        <Typography
                          variant="body1"
                          className={classes.writerTitle}
                        >
                          {newsItem.Name}
                        </Typography>
                      </Link>
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

      <Container id="podcast" className={classes.containerDiv5}>
        <div className={classes.podcastDiv}>
          <img
            src={PodcastBackground}
            alt="Video"
            className={classes.podcastImage}
          />
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
            {Object.keys(podcastData).length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastData.map((podcast, index) => (
                    <div className={classes.podcastContent} key={index}>
                      <ReactPlayer
                        url={podcast.YouTubeURL}
                        className={classes.podcastYoutubeVideo}
                        controls
                      />
                    </div>
                    // <div className={classes.podcastContent}>
                    //   <Link
                    //     to={{
                    //       pathname: `/podcast`,
                    //     }}
                    //     state={podcast}
                    //     className={classes.LinkInnerPages}
                    //   >
                    //     <img
                    //       key={index}
                    //       src={podcast.ImageURL}
                    //       alt={podcast.Title}
                    //       className={classes.podcastMediaImage}
                    //     />
                    //   </Link>
                    //   <IconButton
                    //     className={classes.playButton}
                    //     onClick={() => handlePlay(index)}
                    //   >
                    //     {currentPlayingIndex === index ? (
                    //       <PauseIcon className={classes.playButtonIcon} />
                    //     ) : (
                    //       <PlayArrowIcon className={classes.playButtonIcon} />
                    //     )}
                    //   </IconButton>
                    //   {currentPlayingIndex === index && (
                    //     <ReactPlayer
                    //       url={podcast["YouTube URL"]}
                    //       playing={true}
                    //       controls={true}
                    //       width={640}
                    //       height={360}
                    //       style={{ display: "none" }}
                    //     />
                    //   )}
                    // </div>
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
