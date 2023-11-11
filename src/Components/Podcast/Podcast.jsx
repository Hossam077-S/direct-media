import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FirestoreContext from "../../Utils/FirestoreContext2";

import { Divider } from "@mui/material";

import Slider from "react-slick";

import podcastLogo from "../../assests/podcastLogo.gif";

import useStyles from "./style";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags/MetaTags";

const Podcast = () => {
  const classes = useStyles();

  const { podcastData } = useContext(FirestoreContext);

  const podcastSettings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: podcastData?.length > 3 ? 3 : podcastData?.length,
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

  return (
    <div className={classes.podcastContainer}>
      <MetaTags
        title="Podcasts Page"
        titleName="Discover Podcasts"
        description="هو مجموعة أو سلسلة من الأوامر تعطى للحاسوب لتنفيد مهمة معينة في إطار
        زمني..."
        imageUrl={podcastLogo}
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.imageContainer}>
        <img
          src={podcastLogo}
          alt="PodcastLogo"
          className={classes.imageLogo}
        />
      </div>
      <div className={classes.descriptionContent}>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.SliderDivider}
        />
        <p className={classes.description}>
          هو مجموعة أو سلسلة من الأوامر تعطى للحاسوب لتنفيد مهمة معينة في إطار
          زمني. والمصطلح يطلق على جميع البرامج اللازمة لتشغيل الحاسوب وتنظيم عمل
          وحداته وكذلك تنسيق العلاقة بين هذه الوحدات. ويمكن لهذه البرامج أن تكون
          بسيطة مثل معالجة نص ما، أو معقداً أكثر مثل منظومات محاسبة شركة أو
          معالجة رسومات ثلاثية الأبعاد
        </p>
      </div>
      <div className={classes.podcastItemContainer}>
        {podcastData?.length > 0 ? (
          <div className={classes.podcastMediaItems}>
            <Slider {...podcastSettings}>
              {podcastData?.map((podcast, index) => (
                <div className={classes.podcastContent} key={index}>
                  <Link to={`/podcast/${podcast.id}`}>
                    <img
                      src={podcast?.ImageURL}
                      alt={podcast?.Title}
                      className={classes.podcastImageCover}
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <h3>No podcast available.</h3>
        )}
      </div>
    </div>
  );
};

export default Podcast;
