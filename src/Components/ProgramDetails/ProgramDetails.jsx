import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../Utils/firebase";

import useStyles from "./style";

import YouTube from "react-youtube";
import URLParse from "url-parse";

const ProgramDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [programItem, setNewsItem] = useState({});

  const [videoId, setVideoId] = useState(null);

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "ProgramsEpisodes", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    let videoUrl = null;

    if (programItem) {
      videoUrl = programItem.YouTubeURL;
    }

    if (videoUrl) {
      const url = new URLParse(videoUrl, true);
      const id = url.query.v;
      setVideoId(id);
    } else {
      setVideoId(0);
    }
  }, [programItem]);

  const formattedDate = programItem?.PublishDate?.toDate()?.toLocaleDateString(
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
        <div className={classes.Title}>{programItem?.Title}</div>
        <div className={classes.Content}>
          <div className={classes.VideoDiv}>
            {videoId && (
              <div className={classes.VideoDiv}>
                <YouTube videoId={videoId} className={classes.youtubeVideo} />
              </div>
            )}
          </div>

          <div className={classes.Date}>{formattedDate}</div>
          <div className={classes.Description}>{programItem?.Description}</div>
        </div>
      </div>
    </>
  );
};

export default ProgramDetails;
