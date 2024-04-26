import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import RTL from "../RTL/RTL";

import useStyles from "./styles";
import MetaTags from "../MetaTags/MetaTags";

import FirestoreContext from "../../Utils/FirestoreContext2";
import LazyImage from "../LazyImage/LazyImage";

const NewsPage = () => {
  const classes = useStyles();
  const { newsData, groupedData, fetchMoreNews } = useContext(FirestoreContext);
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10); // Number of news per page

  const sortedNewsData = (newsData || [])
    .slice()
    .sort((a, b) => b.PublishDate - a.PublishDate);

  const sortedGroupedData = {};
  Object.keys(groupedData || {}).forEach((key) => {
    sortedGroupedData[key] = (groupedData[key] || [])
      .slice()
      .sort((a, b) => b.PublishDate - a.PublishDate);
  });

  const filteredNews =
    category === "كل الأخبار"
      ? sortedNewsData
      : sortedGroupedData?.[category] || [];

  useEffect(() => {
    // This will reset the page to 1 when the category changes
    setCurrentPage(1);
  }, [category]); // <- This ensures the effect runs when 'category' or 'filteredNews' changes

  // Pagination handling
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // If the user is on the last page and there are more than 10 news items
    if (value === count) {
      fetchMoreNews(category);
    }
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews?.slice(indexOfFirstNews, indexOfLastNews);

  // Calculate the total number of pages
  const count = Math.ceil(filteredNews?.length / newsPerPage);

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
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
                  <LazyImage
                    src={newsItem.ImageURL}
                    alt={newsItem.Title}
                    className={classes.newsImage}
                  />
                  <div className={classes.newsContent}>
                    <Link
                      to={"/news/" + newsItem.NewsID}
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
                hidePrevButton={currentPage === 1}
                hideNextButton={currentPage === count}
              />
            </Stack>
          </>
        )}
      </div>
    </RTL>
  );
};

export default NewsPage;
