import React, { useContext } from "react";

import FirestoreContext from "../../Utils/FirestoreContext2";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./style";
import MetaTags from "../MetaTags/MetaTags";

const ProgramDetails = () => {
  const classes = useStyles();

  const { programsData } = useContext(FirestoreContext);

  return (
    <div className={classes.container}>
      <MetaTags
        title="Programs Page"
        titleName="Discover Programs"
        description="Explore and discover all the programs that we have!"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83"
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.newsList}>
        {programsData.map((program, index) => (
          <div key={index} className={classes.program}>
            <img
              src={program["Image URL"]}
              alt={program.Title}
              className={classes.newsImage}
            />
            <div className={classes.newsContent}>
              <Link
                to={"/program/" + program.id}
                className={classes.LinkInnerPages}
              >
                <h2 className={classes.newsTitle}>{program.Title}</h2>
              </Link>
              <p className={classes.newsDescription}>
                <Dotdotdot clamp={5}>{program.Description}</Dotdotdot>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramDetails;
