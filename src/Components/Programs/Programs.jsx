import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  db,
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "../../Utils/firebase";

import { useParams } from "react-router-dom";

import useStyles from "./style";

import arrowRColored from "../../assests/arrowRColored.gif";
import arrowLColored from "../../assests/arrowLColored.gif";

import { Divider } from "@mui/material";

import Slider from "react-slick";

import ReactPlayer from "react-player";

const Programs = () => {
  const classes = useStyles();

  const { id } = useParams();

  const [programItem, setProgramItem] = useState({});
  const [ProgramEposide, setProgramEposide] = useState(null);
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

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Programs", id);

    getDoc(q).then((docSnap) => {
      setProgramItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    const fetchProgramEpisodes = async () => {
      if (programItem?.ProgramsID && programItem.ProgramsID.length > 0) {
        const episodeIds = programItem.ProgramsID;

        // Create a query to fetch episodes with matching IDs
        const q = query(
          collection(db, "ProgramsEpisodes"),
          where("EpisodeID", "in", episodeIds)
        );
        const querySnapshot = await getDocs(q);

        // Extract the episode data from the query snapshot
        const episodes = querySnapshot.docs.map((doc) => doc.data());

        setProgramEposide(episodes);
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProgramEpisodes();
  }, [programItem?.ProgramsID]);

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
    // While loading, display a loading message or spinner
    return <div className={classes.container}>Loading...</div>;
  }

  return (
    <>
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
            ) : id === "7s6Zwakzt8JpvYOvgvQD" ? (
              <div className={classes.EpisodesSliderDiv}>
                <Slider {...episodeSettings}>
                  {ProgramEposide.map((episode) => (
                    <div className={classes.episodeContent} key={episode.id}>
                      <ReactPlayer
                        url={episode.YoutubeLink}
                        className={classes.episodeYoutubeVideo}
                        controls
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
                      <ReactPlayer
                        url={episode.YoutubeLink}
                        className={classes.episodeYoutubeVideo2}
                        controls
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
