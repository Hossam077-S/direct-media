import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Link, useParams } from "react-router-dom";
import {
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "../../Utils/firebase";

import useStyles from "./style";

const WriterDetails = () => {
  const { id } = useParams();

  const classes = useStyles();

  const [writerItem, setWriterItem] = useState({});
  const [wrtierArticle, setWrtierArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Getting Data from firebase
  useEffect(() => {
    const q = doc(db, "Writers", id);

    getDoc(q).then((docSnap) => {
      setWriterItem(docSnap.data());
    });
  }, [id]);

  useEffect(() => {
    const fetchProgramEpisodes = async () => {
      if (writerItem?.ArticleID && writerItem?.ArticleID?.length > 0) {
        const wArticle = writerItem.ArticleID;

        // Create a query to fetch episodes with matching IDs
        const q = query(
          collection(db, "Articles"),
          where("ArticleID", "in", wArticle)
        );
        const querySnapshot = await getDocs(q);

        // Extract the episode data from the query snapshot
        const wArticles = querySnapshot.docs.map((doc) => doc.data());

        setWrtierArticle(wArticles);
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProgramEpisodes();
  }, [writerItem?.ArticleID]);

  if (loading) {
    // While loading, display a loading message or spinner
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.Title}>{writerItem?.Name}</div>
        <div className={classes.Content}>
          <div className={classes.ImageDiv}>
            <img
              src={writerItem?.ProfileImage}
              alt={writerItem?.Name}
              className={classes.newsDetailsImage}
            />
          </div>
          {/* List of Episodes */}
          <div className={classes.EpisodesList}>
            <h2 className={classes.EpisodesHeaderTitle}>المقالات:</h2>
            {wrtierArticle.length === 0 ? (
              <p>لا يوجد اي مقالات.</p>
            ) : (
              <ul>
                {wrtierArticle.map((wArticle) => (
                  <Link
                    to={"/article/" + wArticle.ArticleID}
                    state={writerItem}
                    className={classes.LinkInnerPages}
                  >
                    <li
                      key={wArticle.ArticleID}
                      className={classes.EpisodesTitle}
                    >
                      {wArticle.Text}
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

export default WriterDetails;
