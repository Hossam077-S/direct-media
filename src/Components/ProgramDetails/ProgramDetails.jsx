import React, { useEffect, useState } from "react";

import { collection, db, onSnapshot } from "../../Utils/firebase";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./style";

const ProgramDetails = () => {
  const classes = useStyles();

  const [programItem, setProgramItem] = useState([]);

  useEffect(() => {
    const unsubscribeProgrames = onSnapshot(
      collection(db, "Programs"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });

        setProgramItem(result);
      }
    );

    return () => {
      unsubscribeProgrames();
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.newsList}>
        {programItem.map((program, index) => (
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
