import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useParams } from "react-router-dom";

import useStyles from "./style";

import arrowRColored from "../../assests/arrowRColored.gif";
import arrowLColored from "../../assests/arrowLColored.gif";

import { Divider } from "@mui/material";

import Slider from "react-slick";

import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import { SuspenseFallback } from "../SuspenseFallback/SuspenseFallback";
import FirestoreContext from "../../Utils/FirestoreContext2";
import MetaTags from "../MetaTags/MetaTags";

const Programs = () => {
  const { id } = useParams();

  const { programsData, programsDataEpisodes } = useContext(FirestoreContext);

  const classes = useStyles();

  const [programItem, setProgramItem] = useState({});
  const [ProgramEposide, setProgramEposide] = useState([]);
  const [loading, setLoading] = useState(true);

  const episodeSettings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <img src={arrowLColored} alt={"arrowLeft"} />,
    nextArrow: <img src={arrowRColored} alt={"arrowLeft"} />,
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

  const episodeSettings2 = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: programItem?.ProgramsID?.length,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 6000,
    rtl: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: programItem?.ProgramsID?.length,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: programItem?.ProgramsID?.length,
        },
      },
    ],
  };

  useEffect(() => {
    const programs = programsData?.find((program) => program.id === id);

    if (programs) {
      setProgramItem(programs);
    } else {
      console.log("program not found");
    }

    setLoading(false);
  }, [id, programsData]);

  useEffect(() => {
    // Check if programItem and programsDataEpisodes are available
    if (programItem?.ProgramsID && programsDataEpisodes) {
      const episodeIds = new Set(programItem.ProgramsID);

      // Filter episodes from context using the IDs from programItem
      const episodes = programsDataEpisodes.filter((episode) =>
        episodeIds.has(episode.EpisodeID)
      );

      setProgramEposide(episodes);
    }
    setLoading(false);
  }, [programItem?.ProgramsID, programsDataEpisodes]);

  const formattedDate =
    ProgramEposide?.PublishDate instanceof String
      ? ProgramEposide.PublishDate.toDate().toLocaleDateString("ar", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  if (loading) {
    return <SuspenseFallback cName="dots" />;
  }

  return (
    <>
      <MetaTags
        title="Program Details"
        titleName={programItem?.Title}
        description={programItem?.Description}
        imageUrl={programItem?.["Image URL"]}
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.container}>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={programItem?.["Image URL"]}
              alt={programItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.progContent}>
            <div className={classes.dividerContent}>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
            </div>
            <div className={classes.descriptionContent}>
              <p className={classes.description}>{programItem.Description}</p>
            </div>
          </div>

          {/* List of Episodes */}
          <div className={classes.Date}>{formattedDate}</div>
          <div className={classes.EpisodesList}>
            {ProgramEposide.length === 0 ? (
              <p>لا يوجد أي حلقات.</p>
            ) : id === "z4yIpPQkFYkH36oaLwL0" ? (
              <div className={classes.EpisodesSliderDiv}>
                <Slider {...episodeSettings}>
                  {ProgramEposide.map((episode) => (
                    <div className={classes.episodeContent} key={episode.id}>
                      <VideoComponent
                        videoUrl={episode?.YoutubeLink}
                        thumbnailUrl={episode?.thumbnailUrl}
                        cName="episodeYoutubeVideo"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={classes.EpisodesSliderDiv2}>
                <Slider {...episodeSettings2}>
                  {ProgramEposide.map((episode) => (
                    <div className={classes.episodeContent2} key={episode.id}>
                      <VideoComponent
                        videoUrl={episode?.YoutubeLink}
                        thumbnailUrl={episode?.thumbnailUrl}
                        cName="episodeYoutubeVideo2"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
