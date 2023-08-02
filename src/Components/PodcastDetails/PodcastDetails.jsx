import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../../Utils/firebase";

import useStyles from "./style";

import YouTube from "react-youtube";
import URLParse from "url-parse";

const PodcastDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [podcastItem, setPodcastItem] = useState({});

  const [videoId, setVideoId] = useState(null);

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Podcast", id);

    getDoc(q).then((docSnap) => {
      setPodcastItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    let videoUrl = null;
    videoUrl = podcastItem?.["YouTube URL"];
    if (videoUrl) {
      const url = new URLParse(videoUrl, true);
      const id = url.query.v;
      setVideoId(id);
    } else {
      setVideoId(null);
    }
  }, [podcastItem]);

  const formattedDate = podcastItem?.PublishDate?.toDate()?.toLocaleDateString(
    "ar",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

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
            - {podcastItem?.Description}
          </div>
          <div className={classes.VideoDiv}>
            <YouTube videoId={videoId} className={classes.youtubeVideo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastDetails;
