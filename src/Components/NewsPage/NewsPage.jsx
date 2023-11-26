import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FirestoreContext from "../../Utils/FirestoreContext2";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import RTL from "../RTL/RTL";

import useStyles from "./styles";
import MetaTags from "../MetaTags/MetaTags";

import { SuspenseFallback2 } from "../SuspenseFallback/SuspenseFallback2";
import LazyImage from "../LazyImage/LazyImage";

const NewsPage = () => {
  const classes = useStyles();
  const { newsData } = useContext(FirestoreContext);
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10); // Number of news per page
  const [sortedNewsData, setSortedNewsData] = useState();
  const [loading, setLoading] = useState(true);

  // Function to compare dates for sorting
  const compareDates = (a, b) => {
    const dateA = a.PublishDate.toDate();
    const dateB = b.PublishDate.toDate();
    return dateB - dateA;
  };

  useEffect(() => {
    if (newsData) {
      setSortedNewsData([...newsData].sort(compareDates));
    } else {
      console.log("There is no news yet");
    }

    setLoading(false);
  }, [newsData]);

  // Filter news items based on the selected category
  const filteredNews =
    category === "كل الأخبار"
      ? sortedNewsData
      : sortedNewsData?.filter((newsItem) => newsItem?.Category === category);

  useEffect(() => {
    // This will reset the page to 1 when the category changes
    setCurrentPage(1);
  }, [category]); // <- This ensures the effect runs when 'category' changes

  // Pagination handling
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews?.slice(indexOfFirstNews, indexOfLastNews);

  // Calculate the total number of pages
  const count = Math.ceil(filteredNews?.length / newsPerPage);

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  if (loading) {
    return <SuspenseFallback2 cName="dots" />;
  }

  return (
    <RTL>
      <MetaTags
        title="News Page"
        titleName="Discover News"
        description="Explore and descover the world"
        imageUrl="https://firebasestorage.googleapis.com/v0/b/directmedia-6b77f.appspot.com/o/Logo%2FAsset%201.png?alt=media&token=3af7b936-abda-4c0b-9718-a4a5a013bf83"
        url={window.location.href}
        hashtags="#News #Programs #Podcasts #Categories #Sport #War"
      />
      <div className={classes.container}>
        {filteredNews?.length === 0 ? (
          <p>لا يوجد أخبار {category}.</p>
        ) : (
          <>
            <div className={classes.newsList}>
              {currentNews?.map((newsItem, index) => (
                <div key={index} className={classes.newsItem}>
                  {/* <img
                    src={newsItem.ImageURL}
                    alt={newsItem.Title}
                    className={classes.newsImage}
                  /> */}
                  <LazyImage
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
                        <span>{truncate(newsItem.Title, 65)}</span>
                      </h2>
                    </Link>
                    <p className={classes.newsDescription}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: truncate(newsItem.Description, 120),
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Stack
              spacing={2}
              alignItems="center"
              className={classes.pagination}
            >
              <Pagination
                count={count}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
          </>
        )}
      </div>
    </RTL>
  );
};

export default NewsPage;
