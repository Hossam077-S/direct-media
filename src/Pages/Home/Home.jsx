import React, { useContext, useState } from "react";

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
import arrowINup from "../../assests/arrowINup.gif";
import arrowINdown from "../../assests/arrowINdown.gif";
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
import Dotdotdot from "react-dotdotdot";

import NewsTypeSliderItem from "./newsTypeSliderItem";
import ThreeSliderComponentItem from "./ThreeSliderComponentItem";

import FirestoreContext from "../../Utils/FirestoreContext";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import LazyImage from "../../Components/LazyImage/LazyImage";
import TimeDifferenceComponent from "../../Components/TimeDifference/TimeDifferenceComponent";

const Home = () => {
  const classes = useStyles();

  const {
    newsData,
    programsData,
    writersData,
    articlesData,
    podcastData,
    groupedData,
    latestProgram,
    groupedProgramsData,
  } = useContext(FirestoreContext);

  const [hoverIndex, setHoverIndex] = useState(-1);

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
    speed: 900,
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
                          <span>
                            <Dotdotdot clamp={2}>{newsItem.Title}</Dotdotdot>
                          </span>
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
                            <span>
                              <Dotdotdot clamp={2}>
                                {newsItem.Description}
                              </Dotdotdot>
                            </span>
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
                  to={"program/z4yIpPQkFYkH36oaLwL0"}
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
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.local.map((newsItem, index) => (
                      <div key={index}>
                        <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                      </div>
                    ))}
                  </Slider>
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
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.press.map((newsItem, index) => (
                      <div key={index}>
                        <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                      </div>
                    ))}
                  </Slider>
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
                {newsData.length > 0 ? (
                  <Slider {...newsTypesSliderSettings}>
                    {groupedData.inter.map((newsItem, index) => (
                      <div key={index}>
                        <NewsTypeSliderItem Item={newsItem} ItemIndex={index} />
                      </div>
                    ))}
                  </Slider>
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
            {newsData.length > 0 ? (
              <div>
                <div className={classes.articlImageDiv}>
                  {/* Need Just filter */}
                  <Slider {...allNewsSlider}>
                    {newsData.map((newsItem, index) => (
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
                                              <Dotdotdot clamp={2}>
                                                {articleItem.Text}
                                              </Dotdotdot>
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
            {podcastData?.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastData?.map((podcast, index) => (
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
