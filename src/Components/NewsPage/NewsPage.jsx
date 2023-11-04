import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db, collection, onSnapshot } from "../../Utils/firebase";

import Dotdotdot from "react-dotdotdot";

import useStyles from "./styles";

const NewsPage = () => {
  const classes = useStyles();

  const { category } = useParams();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const unsubscribeNews = onSnapshot(collection(db, "News"), (snapshot) => {
      const result = snapshot.docs.map((doc) => {
        const x = doc.data();
        x.id = doc.id;
        return x;
      });

      setNewsData(result);
    });

    return () => {
      unsubscribeNews();
    };
  }, []);

  // Function to compare dates for sorting
  const compareDates = (a, b) => {
    const dateA = a.PublishDate.toDate();
    const dateB = b.PublishDate.toDate();
    return dateB - dateA;
  };

  const sortedNewsData = [...newsData].sort(compareDates);

  // Filter news items based on the selected category
  const filteredNews =
    category === "كل الأخبار"
      ? sortedNewsData
      : sortedNewsData.filter((newsItem) => newsItem.Category === category);

  return (
    <div className={classes.container}>
      {filteredNews.length === 0 ? (
        <p>لا يوجد أخبار {category}.</p>
      ) : (
        <div className={classes.newsList}>
          {filteredNews.map((newsItem, index) => (
            <div key={index} className={classes.newsItem}>
              <img
                src={newsItem.ImageURL}
                alt={newsItem.Title}
                className={classes.newsImage}
              />
              <div className={classes.newsContent}>
                <Link
                  to={"/news/" + newsItem.id}
                  className={classes.LinkInnerPages}
                >
                  <h2 className={classes.newsTitle}>
                    <Dotdotdot clamp={5}>{newsItem.Title}</Dotdotdot>
                  </h2>
                </Link>
                <p className={classes.newsDescription}>
                  <Dotdotdot clamp={5}>{newsItem.Description}</Dotdotdot>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
