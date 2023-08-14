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

import Slider from "react-slick";

import arrowRColored from "../../assests/arrowRColored.gif";
import arrowLColored from "../../assests/arrowLColored.gif";

import VideoComponent from "../../Components/VideoComponent/VideoComponent";

import useStyles from "./style";

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

  useEffect(() => {
    const q = doc(db, "Podcast", id);

    getDoc(q).then((docSnap) => {
      setPodcastItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    const fetchPodcastEpisodes = async () => {
      if (podcastItem?.PodcastsID?.length > 0) {
        const productsID = podcastItem.PodcastsID;

        const q = query(
          collection(db, "PodcastEpisodes"),
          where("EpisodeID", "in", productsID)
        );
        const querySnapshot = await getDocs(q);

        const podcastEpisodes = querySnapshot.docs.map((doc) => doc.data());

        // Loop through the fetched episodes to update thumbnail URLs
        const episodesWithThumbnails = podcastEpisodes.map((episode) => {
          if (episode.YouTubeURL) {
            const videoUrl = new URL(episode.YouTubeURL);
            const videoId = videoUrl?.searchParams.get("v");
            episode.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          }
          return episode;
        });

        setPodcastEp(episodesWithThumbnails);
      }
    };

    fetchPodcastEpisodes();
  }, [podcastItem.PodcastsID]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.CoverDiv}>
          <img
            src={podcastItem?.CoverImage}
            alt={podcastItem?.Title}
            className={classes.CoverImage}
          />
        </div>
        <div className={classes.Content}>
          <div className={classes.podcastMediaHeader}>
            {podcastEp?.length > 0 ? (
              <div className={classes.podcastMediaItems}>
                <Slider {...podcastSettings}>
                  {podcastEp?.map((podcast, index) => (
                    <div className={classes.podcastContent} key={index}>
                      <VideoComponent
                        videoUrl={podcast?.YouTubeURL}
                        thumbnailUrl={podcast?.thumbnailUrl}
                        cName="podcastYoutubeVideo"
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
