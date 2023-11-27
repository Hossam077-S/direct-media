import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import useStyles from "./style";
import { Divider } from "@mui/material";
import { SuspenseFallback2 } from "../SuspenseFallback/SuspenseFallback2";
import FirestoreContext from "../../Utils/FirestoreContext2";
import MetaTags from "../MetaTags/MetaTags";

const WriterDetails = () => {
  const { id } = useParams();

  const { articlesData, writersData } = useContext(FirestoreContext);

  const classes = useStyles();

  const [writerItem, setWrtierItem] = useState(null);
  const [wrtierArticle, setWrtierArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the writer with the same id from the writers data context
    const writers = writersData?.find((writer) => writer.id === id);

    if (writers) {
      setWrtierItem(writers);
    } else {
      console.log("Writer not found");
    }

    setLoading(false);
  }, [id, writersData]);

  useEffect(() => {
    const findWriterArticles = () => {
      if (writerItem?.ArticleID?.length > 0) {
        // Assuming ArticleID is an array of IDs.
        const wArticles = writerItem.ArticleID.map((id) =>
          articlesData.find((article) => article.id === id)
        ).filter((article) => article != null); // This will remove any undefined entries if an article wasn't found.

        setWrtierArticle(wArticles);
      }
      setLoading(false);
    };

    findWriterArticles();
  }, [writerItem?.ArticleID, articlesData]);

  if (loading) {
    return <SuspenseFallback2 cName="dots" />;
  }
  return (
    <div className={classes.container}>
      <MetaTags
        title="Writer Details"
        titleName={writerItem?.Name}
        description={writerItem?.Description}
        imageUrl={writerItem?.ProfileImage}
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.Content}>
        <div className={classes.ImageDiv}>
          <img
            src={writerItem?.ProfileImage}
            alt={writerItem?.Name}
            className={classes.newsDetailsImage}
          />
        </div>
        <div className={classes.Title}>{writerItem?.Name}</div>
        <div className={classes.writerContent}>
          <div className={classes.dividerContent}>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
          </div>
          <div className={classes.descriptionContent}>
            <p className={classes.description}>{writerItem.Description}</p>
          </div>
        </div>
        {/* List of Episodes */}
        <div className={classes.EpisodesList}>
          <p className={classes.EpisodesHeaderTitle}>المقالات</p>
          {wrtierArticle?.length === 0 ? (
            <p>لا يوجد اي مقالات.</p>
          ) : (
            <ul className={classes.EpisodesUL}>
              {wrtierArticle?.map((wArticle) => (
                <Link
                  to={"/article/" + wArticle.ArticleID}
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
  );
};

export default WriterDetails;
