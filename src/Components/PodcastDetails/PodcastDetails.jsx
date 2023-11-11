import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useParams } from "react-router-dom";

import Slider from "react-slick";

import arrowRColored from "../../assests/arrowRColored.gif";
import arrowLColored from "../../assests/arrowLColored.gif";

import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import { SuspenseFallback } from "../SuspenseFallback/SuspenseFallback";
import FirestoreContext from "../../Utils/FirestoreContext2";

import useStyles from "./style";
import MetaTags from "../MetaTags/MetaTags";

const PodcastDetails = () => {
  const classes = useStyles();

  const { id } = useParams();

  const { podcastData, podcastDataEpisodes } = useContext(FirestoreContext);

  const [podcastItem, setPodcastItem] = useState({});
  const [podcastEp, setPodcastEp] = useState({});
  const [loading, setLoading] = useState(true);

  const podcastSettings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: podcastItem?.length > 3 ? 3 : podcastItem?.length,
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
    const podcasts = podcastData?.find((podcast) => podcast.id === id);

    if (podcasts) {
      setPodcastItem(podcasts);
    } else {
      console.log("program not found");
    }

    setLoading(false);
  }, [id, podcastData]);

  useEffect(() => {
    // Check if podcastItem and podcastDataEpisodes are available
    if (podcastItem?.PodcastsID && podcastDataEpisodes) {
      const episodeIds = new Set(podcastItem.PodcastsID);

      // Filter episodes from context using the IDs from podcastItem
      const episodes = podcastDataEpisodes.filter((episode) =>
        episodeIds.has(episode.EpisodeID)
      );

      setPodcastEp(episodes);
    }
    setLoading(false);
  }, [podcastItem?.PodcastsID, podcastDataEpisodes]);

  if (loading) {
    return <SuspenseFallback cName="dots" />;
  }

  return (
    <>
      <MetaTags
        title="Podcast Details"
        titleName={podcastItem?.Title || "Podcast Details"}
        description={podcastItem?.Title}
        imageUrl={podcastItem?.CoverImage}
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
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
