import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { collection, db, onSnapshot } from "../../Utils/firebase";

import { Divider } from "@mui/material";

import Slider from "react-slick";

import podcastLogo from "../../assests/podcastLogo.gif";

import useStyles from "./style";
import { Link } from "react-router-dom";

const Podcast = () => {
  const classes = useStyles();
  const [podcastData, setPodcastData] = useState([]);

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

  // Getting Data from firebase
  useEffect(() => {
    const unsubscribeNews = onSnapshot(
      collection(db, "Podcast"),
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
      unsubscribeNews();
    };
  }, []);

  return (
    <div className={classes.podcastContainer}>
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
