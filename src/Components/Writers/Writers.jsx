import React, { useContext } from "react";
import FirestoreContext from "../../Utils/FirestoreContext2";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./styles";

const Writers = () => {
  const classes = useStyles();
  const { writersData } = useContext(FirestoreContext);

  return (
    <div className={classes.container}>
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
