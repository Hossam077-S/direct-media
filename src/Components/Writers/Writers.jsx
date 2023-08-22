import React, { useEffect, useState } from "react";

import { collection, db, onSnapshot } from "../../Utils/firebase";

import { Link } from "react-router-dom";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./styles";

const Writers = () => {
  const classes = useStyles();

  const [writersItem, setWritersItem] = useState([]);

  useEffect(() => {
    const unsubscribeWriters = onSnapshot(
      collection(db, "Writers"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const x = doc.data();
          x.id = doc.id;
          return x;
        });

        setWritersItem(result);
      }
    );

    return () => {
      unsubscribeWriters();
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.newsList}>
        {writersItem?.map((writer, index) => (
          <div key={index} className={classes.writer}>
            <img
              src={writer.ProfileImage}
              alt={writer.Name}
              className={classes.newsImage}
            />
            <div className={classes.newsContent}>
              <Link
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
