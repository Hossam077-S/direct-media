import React, { useContext } from "react";
import FirestoreContext from "../../Utils/FirestoreContext2";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./styles";
import MetaTags from "../MetaTags/MetaTags";

const Writers = () => {
  const classes = useStyles();
  const { writersData } = useContext(FirestoreContext);

  return (
    <div className={classes.container}>
      <MetaTags
        title="Writer Page"
        titleName="Discover the writers"
        description="Explore and descover the world"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83"
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.newsList}>
        {writersData?.map((writer, index) => (
          <div key={index} className={classes.writer}>
            <img
              src={writer.ProfileImage}
              alt={writer.Name}
              className={classes.newsImage}
            />
            <div className={classes.newsContent}>
              <Link
                state={writer}
                to={"/writer/" + writer.id}
                className={classes.LinkInnerPages}
              >
                <h2 className={classes.newsTitle}>{writer.Name}</h2>
              </Link>
              <p className={classes.newsDescription}>
                <Dotdotdot clamp={5}>{writer.Description}</Dotdotdot>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writers;
