import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useParams } from "react-router-dom";
import {
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "../../Utils/firebase";

import useStyles from "./style";

import Slider from "react-slick";
import ReactPlayer from "react-player";

const PodcastDetails = () => {
  const classes = useStyles();

  const { id } = useParams();

  const [podcastItem, setPodcastItem] = useState({});
  const [podcastEp, setPodcastEp] = useState({});

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
    const q = doc(db, "Podcast", id);

    getDoc(q).then((docSnap) => {
      setPodcastItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    const fetchPodcastEpisodes = async () => {
      if (podcastItem?.PodcastsID?.length > 0) {
        const productsID = podcastItem?.PodcastsID;

        const q = query(
          collection(db, "PodcastEpisodes"),
          where("EpisodeID", "in", productsID)
        );
        const querySnapshot = await getDocs(q);

        const podcastEpisodes = querySnapshot.docs.map((doc) => doc.data());

        setPodcastEp(podcastEpisodes);
      }
    };

    fetchPodcastEpisodes();
  }, [podcastItem.PodcastsID]);

  const formattedDate = podcastItem?.PublishDate?.toDate()?.toLocaleDateString(
    "ar",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  console.log("test", podcastEp);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{podcastItem?.Title} </div>
        <div className={classes.Date}>{formattedDate}</div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={podcastItem?.ImageUrl}
              alt={podcastItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>

          <div className={classes.Description}>
            <span style={{ fontFamily: "GE_SS_Two_M" }}>
              {podcastItem?.Category}
            </span>{" "}
          </div>
          <div className={classes.podcastMediaHeader}>
            {podcastEp?.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastEp?.map((podcast, index) => (
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
              <h3 variant="body1" gutterBottom>
                لا يوجد حلقات
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastDetails;
