import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { db, collection, getDocs, query, where } from "../../Utils/firebase";

import {
  Container,
  Stack,
  Typography,
  Skeleton,
  ListItemAvatar,
  Avatar,
  Divider,
  List,
  ListItem,
} from "@mui/material";

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

  const groupedPressNews2 = [...pressNews];
  const groupedLocalNewsThree = [...localNews];
  const groupedInternationalNews2 = [...internationalNews];
  const groupedImportantNews = [...ImportantNews];

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
    groupedInternationalNews.push(internationalNews.splice(0, numberOfItems));
  }

  console.log("test1");
  return {
    press: groupedPressNews,
    press2: groupedPressNews2,
    local: groupedLocalNews,
    local2: groupedLocalNewsThree,
    inter: groupedInternationalNews,
    inter2: groupedInternationalNews2,
    important: groupedImportantNews,
    result: result,
  };
};

const fetchProgramData = async () => {
  const querySnapshot = await getDocs(collection(db, "Programs"));

  const result = querySnapshot.docs.map((doc) => {
    const x = doc.data();
    x.id = doc.id;
    return x;
  });

  const CaseInOneProgram = result?.filter((m) => m.Title === "قضية بدقيقة");

  let episodes = [];
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
      episodes = querySnapshot.docs.map((doc) => doc.data());
    }
  }
  console.log("test2");

  return {
    episodes: episodes,
    result: result,
  };
};

const fetchWriterData = async () => {
  const querySnapshot = await getDocs(collection(db, "Writers"));

  const result = querySnapshot.docs.map((doc) => {
    const x = doc.data();
    x.id = doc.id;
    return x;
  });

  console.log("test3");

  return {
    result: result,
  };
};

const fetchArticlesData = async () => {
  const querySnapshot = await getDocs(collection(db, "Articles"));

  const result = querySnapshot.docs.map((doc) => {
    const x = doc.data();
    x.id = doc.id;
    return x;
  });

  console.log("test4");

  return {
    result: result,
  };
};

const fetchPodcastData = async () => {
  const querySnapshot = await getDocs(collection(db, "PodcastEpisodes"));

  const result = querySnapshot.docs.map((doc) => {
    const x = doc.data();
    x.id = doc.id;
    return x;
  });

  console.log("test5");

  return {
    result: result,
  };
};

const Home = () => {
  const classes = useStyles();

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [latestProgramData, setLatestProgramData] = useState("");

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
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    pauseOnHover: true,
    autoplaySpeed: 2000,
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

  // const {
  //   data: newsData,
  //   isLoading,
  //   isError,
  //   dataUpdatedAt,
  //   isStale
  // } = useQuery("news", fetchNewsData);

  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery("news", fetchNewsData, {
    staleTime: 120000 * 100,
  });
  const { data: programsData } = useQuery("programs", fetchProgramData, {
    staleTime: 120000 * 100,
  });
  const { data: writersData } = useQuery("writers", fetchWriterData, {
    staleTime: 120000 * 100,
  });
  const { data: articlesData } = useQuery("articles", fetchArticlesData, {
    staleTime: 120000 * 100,
  });
  const { data: podcastData } = useQuery("podcast", fetchPodcastData, {
    staleTime: 120000 * 100,
  });

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

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

  // useEffect(() => {
  //   // Check if data is available and if it's not stale (not outdated)
  //   if (!isLoading && !isError && newsData) {
  //     // Use dataUpdatedAt to compare with the current time
  //     const currentTime = Date.now();

  //     // Determine the difference between current time and dataUpdatedAt
  //     const timeSinceLastUpdate = currentTime - dataUpdatedAt;

  //     // Check if the data is both not stale and has been updated recently
  //     if (!isStale && timeSinceLastUpdate <= 60000) {

  //     }
  //   }
  // }, [newsData, isLoading, isError, isStale, dataUpdatedAt]);

  useEffect(() => {
    const sortedPrograms = programsData?.episodes?.sort((a, b) => {
      return new Date(a.PublishDate) - new Date(b.PublishDate);
    });

    const latestProgram = sortedPrograms?.[sortedPrograms.length - 1];

    setLatestProgramData(latestProgram);
  }, [programsData]);

  if (isLoading) {
    return (
      <div className={classes.loadingLogo}>
        <p>جاري التجميل...</p>
      </div>
    );
  }

  if (isError) {
    return <p>!!!هنالك خلل ما في البينات</p>;
  }

  // const fetchInitialData = async () => {
  //   const unsubscribeNews = onSnapshot(collection(db, "News"), (snapshot) => {
  //     const result = snapshot.docs.map((doc) => {
  //       const x = doc.data();
  //       x.id = doc.id;
  //       return x;
  //     });

  //     const ImportantNews = result.filter((m) => m.Category === "خبر عاجل");
  //     const pressNews = result.filter((m) => m.Category === "صحافة");
  //     const localNews = result.filter((m) => m.Category === "محلي");
  //     const internationalNews = result.filter((m) => m.Category === "دولي");

  //     const numberOfItems = 5;

  //     const groupedImportantNews = [...ImportantNews];

  //     const groupedPressNews2 = [...pressNews];

  //     const groupedLocalNews2 = [...localNews];

  //     const groupedInternationalNews2 = [...internationalNews];

  //     const groupedPressNews = [];
  //     while (pressNews.length > 0) {
  //       groupedPressNews.push(pressNews.splice(0, numberOfItems));
  //     }

  //     const groupedLocalNews = [];
  //     while (localNews.length > 0) {
  //       groupedLocalNews.push(localNews.splice(0, numberOfItems));
  //     }

  //     const groupedInternationalNews = [];
  //     while (internationalNews.length > 0) {
  //       groupedInternationalNews.push(
  //         internationalNews.splice(0, numberOfItems)
  //       );
  //     }

  //     setGrouppedData({
  //       press: groupedPressNews,
  //       press2: groupedPressNews2,
  //       local: groupedLocalNews,
  //       local2: groupedLocalNews2,
  //       inter: groupedInternationalNews,
  //       inter2: groupedInternationalNews2,
  //       important: groupedImportantNews,
  //     });

  //     setNewsData(result);

  //     console.log("newsDataTest");
  //   });

  //   const unsubscribeProgrames = onSnapshot(
  //     collection(db, "Programs"),
  //     async (snapshot) => {
  //       const programsData = snapshot.docs.map((doc) => {
  //         const data = doc.data();
  //         return {
  //           id: doc.id,
  //           ...data,
  //         };
  //       });

  //       const CaseInOneProgram = programsData.filter(
  //         (m) => m.Title === "قضية بدقيقة"
  //       );

  //       if (CaseInOneProgram) {
  //         const programsIDArray = CaseInOneProgram[0]?.ProgramsID || [];

  //         // Create a query to fetch episodes with matching IDs
  //         if (programsIDArray.length > 0) {
  //           const q = query(
  //             collection(db, "ProgramsEpisodes"),
  //             where("EpisodeID", "in", programsIDArray)
  //           );

  //           const querySnapshot = await getDocs(q);

  //           // Extract the episode data from the query snapshot
  //           const episodes = querySnapshot.docs.map((doc) => doc.data());

  //           setGrouppedProgramsData({
  //             programs: episodes,
  //           });
  //         }
  //       }
  //       setProgramsData(programsData);
  //       console.log("programsDataTest");
  //     }
  //   );

  //   const unsubscribeWriters = onSnapshot(
  //     collection(db, "Writers"),
  //     (snapshot) => {
  //       const result = snapshot.docs.map((doc) => {
  //         const x = doc.data();
  //         x.id = doc.id;
  //         return x;
  //       });

  //       setWritersData(result);
  //       console.log("WritersTest");
  //     }
  //   );

  //   const unsubscribeArticles = onSnapshot(
  //     collection(db, "Articles"),
  //     (snapshot) => {
  //       const result = snapshot.docs.map((doc) => {
  //         const x = doc.data();
  //         x.id = doc.id;
  //         return x;
  //       });
  //       setArticlesData(result);
  //       console.log("ArticlesTest");
  //     }
  //   );

  //   const unsubscribePodcast = onSnapshot(
  //     collection(db, "PodcastEpisodes"),
  //     (snapshot) => {
  //       const result = snapshot.docs.map((doc) => {
  //         const x = doc.data();
  //         x.id = doc.id;
  //         return x;
  //       });
  //       setPodcastData(result);
  //       console.log("PodcastEpisodesTest");
  //     }
  //   );
  //   console.log("test");

  //   return () => {
  //     // UnsubscribeNews from the snapshot listener when the component unmounts
  //     unsubscribeNews();
  //     unsubscribeProgrames();
  //     unsubscribeWriters();
  //     unsubscribeArticles();
  //     unsubscribePodcast();
  //   };
  // };

  // useEffect(() => {
  //   if (newsData.length === 0) {
  //     fetchInitialData();
  //   }
  // }, []);

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
            {newsData && Object.keys(newsData).length > 0 ? (
              <div className={classes.importantNewsDiv}>
                <Slider {...importantNew}>
                  {newsData.important.map((newsItem, index) => (
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
          {newsData.result.length > 0 ? (
            <div className={classes.newsImageDiv}>
              <Slider {...allNewsSlider}>
                {newsData.result.map((newsItem, index) => (
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
                <Link
                  to={"programs/z4yIpPQkFYkH36oaLwL0"}
                  className={classes.LinkInnerPages}
                >
                  قضية بدقيقة
                </Link>
              </Typography>
              <img
                src={rectangle2Shape}
                alt="rectangleShape"
                width="204px"
                height="44px"
              />
            </div>

            {/* Render the news Videos slider */}
            {programsData?.episodes?.length > 0 ? (
              <div>
                <div className={classes.VideoDiv}>
                  <ReactPlayer
                    url={latestProgramData?.YoutubeLink}
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
            {programsData?.result?.length > 0 ? (
              <div className={classes.programItems}>
                <Slider {...programSettings}>
                  {programsData?.result?.map((newsItem, index) => (
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
                {newsData && newsData.local.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {newsData.local.map((newsItem, index) => (
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
                {newsData && newsData.press.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {newsData.press.map((newsItem, index) => (
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
                {newsData && newsData.inter.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {newsData.inter.map((newsItem, index) => (
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
            {newsData && newsData.result.length > 0 ? (
              <div>
                <div className={classes.articlImageDiv}>
                  {/* Need Just filter */}
                  <Slider {...allNewsSlider}>
                    {newsData.result.map((newsItem, index) => (
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
                      {newsData.press2.map((newsItem, index) => (
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
                      {newsData.local2.map((newsItem, index) => (
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
                      {newsData.inter2.map((newsItem, index) => (
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
              {writersData && writersData?.result?.length > 0 ? (
                <div className={classes.articlContentDiv}>
                  <div className={classes.articlImage_Divider}>
                    <List className={classes.newsList}>
                      {writersData?.result
                        ?.slice(0, 4)
                        .map((writerItem, index) => (
                          <React.Fragment key={index}>
                            <ListItem
                              className={`${classes.newsListItem} ${
                                index === hoverIndex
                                  ? classes.activeListItem
                                  : ""
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
                                    {articlesData?.result?.map(
                                      (articleItem, index) => {
                                        const articleID =
                                          writerItem.ArticleID[
                                            writerItem.ArticleID.length - 1
                                          ];
                                        if (
                                          articleItem.ArticleID === articleID
                                        ) {
                                          return (
                                            <Link
                                              to={"article/" + articleItem.id}
                                              state={writerItem}
                                              className={classes.LinkInnerPages}
                                              key={index}
                                            >
                                              <Typography
                                                key={index}
                                                className={
                                                  classes.articleContent
                                                }
                                              >
                                                <Dotdotdot clamp={2}>
                                                  {articleItem.Text}
                                                </Dotdotdot>
                                              </Typography>
                                            </Link>
                                          );
                                        }
                                        return null;
                                      }
                                    )}
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
            {writersData?.result?.length > 0 ? (
              <div className={classes.writerItems}>
                <Slider {...writersSettings}>
                  {writersData?.result?.map((newsItem, index) => (
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
            <Link to={`/podcasts`}>
              <Typography className={classes.podcastText}>بودكاست</Typography>
            </Link>
          </div>
          <div className={classes.podcastMediaHeader}>
            {podcastData?.result?.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastData?.result?.map((podcast, index) => (
                    <div className={classes.podcastContent} key={index}>
                      <ReactPlayer
                        url={podcast.YouTubeURL}
                        className={classes.podcastYoutubeVideo}
                        controls
                      />
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
    </>
  );
};

export default Home;
