import React, { useEffect, useState } from "react";

import { db, query, collection, where, getDocs } from "../../Utils/firebase";

import { Link, useLocation } from "react-router-dom";

import useStyles from "./style";

const Programs = () => {
  const location = useLocation();
  const programItem = location.state;

  const classes = useStyles();

  const [ProgramEposide, setProgramEposide] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>
          {programItem?.Title}{" "}
          <span style={{ fontFamily: "GE_SS_Two_L", fontSize: "15px" }}>
            {" "}
            - {formattedDate}
          </span>
        </div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={programItem?.["Image URL"]}
              alt={programItem?.Title}
              className={classes.newsDetailsImage}
            />
          </div>
          <div className={classes.Description}>{programItem?.Description}</div>

          {/* List of Episodes */}
          <div className={classes.EpisodesList}>
            <h2 className={classes.EpisodesHeaderTitle}>الحلقات:</h2>
            {ProgramEposide.length === 0 ? (
              <p>لا يوجد اي حلقات.</p>
            ) : (
              <ul>
                {ProgramEposide.map((episode) => (
                  <Link
                    to={"/programs/" + episode.EpisodeID}
                    className={classes.LinkInnerPages}
                  >
                    <li key={episode.id} className={classes.EpisodesTitle}>
                      {episode.Title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
