import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utils/firebase";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsCollection = collection(db, "News");
        const newsSnapshot = await getDocs(newsCollection);
        const newsData = newsSnapshot.docs.map((doc) => doc.data());
        setNewsData(newsData);
      } catch (error) {
        console.log("Error fetching news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div>
      <h1>News Page</h1>
      <ul>
        {newsData.map((newsItem) => (
          <li key={newsItem.Title}>
            <h2>{newsItem.Title}</h2>
            <img src={newsItem.Image} alt={newsItem.Title} />
            <p>{newsItem.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
