import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  Stack,
  Typography,
  Skeleton,
  ListItemAvatar,
  Divider,
  List,
  ListItem,
} from "@mui/material";

import rectangleShape from "../../assests/rect-tri.gif";
import rectangle2Shape from "../../assests/reactangle.gif";
import arrowLeft from "../../assests/arrowLeft.gif";
import arrowRight from "../../assests/arrowRight.gif";
import arrowThreeLeft from "../../assests/arrowThreeLeft.gif";
import arrowThreeRight from "../../assests/arrowThreeRight.gif";
import PodcastBackground from "../../assests/PodcastBackground.gif";
import arrowRColored from "../../assests/arrowRColored.gif";
import arrowLColored from "../../assests/arrowLColored.gif";

import videoDirectMedia from "../../assests/DMV.gif";

import useStyles from "./styles";

import Slider from "react-slick";

import ThreeSliderComponentItem from "./ThreeSliderComponentItem";

import FirestoreContext from "../../Utils/FirestoreContext2";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import VerticalSlider from "../../Components/VerticalSlider/VerticalSlider";

import LazyImage from "../../Components/LazyImage/LazyImage";
import TimeDifferenceComponent from "../../Components/TimeDifference/TimeDifferenceComponent";
import NewsSlider from "../../Components/NewsSlider/NewsSlider";
import MetaTags from "../../Components/MetaTags/MetaTags";

const Home = () => {
  const classes = useStyles();
  const {
    programsData,
    writersData,
    articlesData,
    podcastDataEpisodes,
    groupedData,
    groupedProgramsData,
    loading,
  } = useContext(FirestoreContext);

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [latestProgram, setLatestProgram] = useState(null);

  useEffect(() => {
    const sortedPrograms = groupedProgramsData?.sort((a, b) => {
      return new Date(a.PublishDate) - new Date(b.PublishDate);
    });

    const latestProgram = sortedPrograms?.[sortedPrograms.length - 1];

    if (latestProgram && latestProgram.YoutubeLink) {
      let videoId, thumbnailUrl;
      const videoUrl = new URL(latestProgram?.YoutubeLink);
      const isShortsVideo = videoUrl.pathname.includes("/shorts/");

      if (isShortsVideo) {
        videoId = videoUrl.pathname.split("/shorts/")[1];
      } else {
        videoId = videoUrl.searchParams.get("v");
      }

      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      }

      setLatestProgram({ ...latestProgram, videoId, thumbnailUrl });
    }
  }, [groupedProgramsData]);

  const allNewsSlider = {
    dots: false,
    infinite: true,
    speed: 900,
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
    speed: 900,
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
  const threeTypeSlider = {
    dots: false,
    infinite: true,
    speed: 900,
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
    autoplay: true,
    speed: 900,
    slidesToShow: writersData.length > 4 ? 4 : writersData.length,
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
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    rtl: true,
    arrows: true,
    prevArrow: <img src={arrowLColored} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowRColored} alt={"arrowLeft"} />,
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

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  if (Object.values(loading).some((isLoading) => isLoading)) {
    return <div>Loading all data...</div>;
  }

  return (
    <>
      <MetaTags
        title="Direct Media"
        titleName="Direct Media Webiste"
        description="Explore all news in the world"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83"
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
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
            <div>
              <VerticalSlider newsItems={groupedData?.important} />
            </div>
          </Stack>
        </div>
        {/* First Slider */}
        <Stack direction="row" className={classes.gridSlidersContainer}>
          {/* Render the News images slider */}
          {groupedData?.limitedNews ? (
            <div className={classes.newsImageDiv}>
              <Slider {...allNewsSlider}>
                {groupedData?.limitedNews?.map((newsItem, index) => (
                  <div key={index} className={classes.sliderItem}>
                    <>
                      <LazyImage
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
                          <a
                            href={"news/" + newsItem.id}
                            className={classes.LinkInnerPages}
                          >
                            <Typography
                              gutterBottom
                              className={classes.sliderNewsTitle}
                            >
                              {newsItem.Title}
                            </Typography>
                          </a>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={classes.sliderNewsDescription}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: truncate(newsItem.Description, 120),
                              }}
                            />
                          </Typography>
                          <Typography className={classes.sliderArticlDate}>
                            {newsItem.PublishDate instanceof Date ? (
                              <TimeDifferenceComponent
                                publishDate={newsItem.PublishDate.toDate()}
                              />
                            ) : (
                              <TimeDifferenceComponent
                                publishDate={newsItem.PublishDate}
                              />
                            )}
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
                  to={"program/OxYOStFyaNReBE9D6oBJ"}
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
            {Object.keys(groupedProgramsData).length > 0 ? (
              <div>
                <div className={classes.VideoDiv}>
                  <VideoComponent
                    videoUrl={latestProgram?.YoutubeLink}
                    thumbnailUrl={latestProgram?.thumbnailUrl}
                    cName="youtubeVideo"
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
            <Link to={`/programs`}>
              <Typography className={classes.programText}>البرامج</Typography>
            </Link>
          </div>
          <div className={classes.programSlider}>
            {programsData?.length > 0 ? (
              <div className={classes.programItems}>
                <Slider {...programSettings}>
                  {programsData?.map((newsItem, index) => (
                    <Link
                      to={"program/" + newsItem.id}
                      className={classes.LinkInnerPages}
                      key={index}
                    >
                      <LazyImage
                        src={newsItem["Image URL"]}
                        alt={newsItem.Title}
                        className={classes.programImage}
                      />
                    </Link>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={classes.programItems}>
                <Skeleton variant="rectangular" height="100px" />
              </div>
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
                <Link to={"/newsPage/محلي"} className={classes.LinkInnerPages}>
                  <Typography className={classes.globalText}>محلي</Typography>
                </Link>
              </div>
              <div className={classes.newsTypeSlider}>
                {groupedData?.local ? (
                  <NewsSlider newsItems={groupedData?.local} />
                ) : (
                  <div>
                    <Skeleton variant="rectangular" height="100px" />
                  </div>
                )}
              </div>
            </div>
            <div className={classes.headerDiv}>
              <div className={classes.globalHeaderDiv}>
                <Link to={"/newsPage/صحافة"} className={classes.LinkInnerPages}>
                  <Typography className={classes.globalText}>صحافة</Typography>
                </Link>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider2}
                />
              </div>
              <div className={classes.newsTypeSlider}>
                {groupedData?.press ? (
                  <NewsSlider newsItems={groupedData?.press} />
                ) : (
                  <div>
                    <Skeleton variant="rectangular" height="100px" />
                  </div>
                )}
              </div>
            </div>
            <div className={classes.headerDiv}>
              <div className={classes.globalHeaderDiv}>
                <Link to={"/newsPage/دولي"} className={classes.LinkInnerPages}>
                  <Typography className={classes.globalText}>دولي</Typography>
                </Link>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className={classes.globalDivider}
                />
              </div>
              <div className={classes.newsTypeSlider}>
                {groupedData?.inter ? (
                  <NewsSlider newsItems={groupedData?.inter} />
                ) : (
                  <div>
                    <Skeleton variant="rectangular" height="100px" />
                  </div>
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
            {groupedData?.sport ? (
              <div>
                <div className={classes.articlImageDiv}>
                  <Slider {...allNewsSlider}>
                    {groupedData?.sport?.map((newsItem, index) => (
                      <div key={index} className={classes.sliderItem}>
                        <>
                          <LazyImage
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
                                {newsItem.PublishDate instanceof Date ? (
                                  <TimeDifferenceComponent
                                    publishDate={newsItem.PublishDate.toDate()}
                                  />
                                ) : (
                                  <TimeDifferenceComponent
                                    publishDate={newsItem.PublishDate}
                                  />
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
                      {groupedData?.weather?.map((newsItem, index) => (
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
                      {groupedData?.report?.map((newsItem, index) => (
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
                      {groupedData?.inter?.map((newsItem, index) => (
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
              {writersData?.length > 0 ? (
                <div className={classes.articlContentDiv}>
                  <div className={classes.articlImage_Divider}>
                    <List className={classes.newsList}>
                      {writersData?.slice(0, 4).map((writerItem, index) => (
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
                                  {articlesData?.map((articleItem, index) => {
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
                                            <span>
                                              {truncate(articleItem.Text, 65)}
                                            </span>
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
                                <LazyImage
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
        <div className={classes.videoImageDiv}>
          <img
            src={videoDirectMedia}
            alt="GIF"
            className={classes.videoImage}
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
            <Link to={`/writers`}>
              <Typography className={classes.writerText}>الكتاب</Typography>
            </Link>
          </div>

          <div className={classes.writerDetails}>
            {writersData?.length > 0 ? (
              <div className={classes.writerItems}>
                <Slider {...writersSettings}>
                  {writersData?.map((newsItem, index) => (
                    <div key={index}>
                      <LazyImage
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
              <div className={classes.writerItems}>
                <Skeleton variant="rectangular" height="100px" />
              </div>
            )}
          </div>
        </div>
      </Container>

      <Container id="podcast" className={classes.containerDiv5}>
        <div className={classes.podcastDiv}>
          <LazyImage
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
            {podcastDataEpisodes?.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastDataEpisodes?.map((podcast, index) => (
                    <div className={classes.podcastContent} key={index}>
                      <VideoComponent
                        videoUrl={podcast.YouTubeURL}
                        thumbnailUrl={podcast.thumbnailUrl}
                        cName="podcastYoutubeVideo"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={classes.podcastContent}>
                <Skeleton variant="rectangular" height="100px" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
