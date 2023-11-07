import React, { useContext } from "react";

import FirestoreContext from "../../Utils/FirestoreContext2";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./style";

const ProgramDetails = () => {
  const classes = useStyles();

  const { programsData } = useContext(FirestoreContext);

  return (
    <div className={classes.container}>
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
