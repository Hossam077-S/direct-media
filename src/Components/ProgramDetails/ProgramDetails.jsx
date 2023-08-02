import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useParams } from "react-router-dom";
import { db, doc, getDoc } from "../../Utils/firebase";

import useStyles from "./style";

import ReactPlayer from "react-player";
const ProgramDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [programItem, setNewsItem] = useState({});

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "ProgramsEpisodes", id);

    getDoc(q).then((docSnap) => {
      setNewsItem(docSnap.data());
    });
  }, [id]);

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
            <div className={classes.VideoDiv}>
              <ReactPlayer
                url={programItem?.YoutubeLink}
                className={classes.youtubeVideo}
                controls
              />
            </div>
          </div>

          <div className={classes.Date}>{formattedDate}</div>
          <div className={classes.Description}>{programItem?.Description}</div>
        </div>
      </div>
    </>
  );
};

export default ProgramDetails;
