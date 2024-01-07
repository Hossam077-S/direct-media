import React, { useState } from "react";

import TimeDifferenceComponent from "../TimeDifference/TimeDifferenceComponent";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./style.css";
import { Link } from "react-router-dom";

const NewsSlider = ({ newsItems }) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const handleNextSlide = (direction) => {
    setCurrentStartIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 5) % newsItems.length
          : (prevIndex - 5 + newsItems.length) % newsItems.length;

      return newIndex;
    });
  };

  // This assumes that newsItems is an array of objects with id, title, imageUrl, and publishedDate properties
  const visibleItems = newsItems.slice(
    currentStartIndex,
    currentStartIndex + 5
  );

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <div className="news-slider">
      <div className="news-items">
        {visibleItems.map((item) => (
          <div className="news-item" key={item.id}>
            <div className="news-image">
              <img src={item.ImageURL} alt={item.title} />
            </div>
            <div className="news-content">
              <div className="news-title">
                <Link to={"news/" + item.id} className="link-news-pages">
                  {truncate(item.Title, 35)}
                </Link>
              </div>
              <div className="date">
                <p className="date-text">
                  {" "}
                  {item.PublishDate instanceof Date ? (
                    <TimeDifferenceComponent
                      publishDate={item.PublishDate.toDate()}
                    />
                  ) : (
                    <TimeDifferenceComponent publishDate={item.PublishDate} />
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="news-controls">
        <button
          type="button"
          className="carousel-button-news prev"
          onClick={() => handleNextSlide("prev")}
        >
          <KeyboardArrowRightIcon />
        </button>
        <button
          type="button"
          className="carousel-button-news next"
          onClick={() => handleNextSlide("next")}
        >
          <KeyboardArrowLeftIcon />
        </button>
      </div>
    </div>
  );
};

export default NewsSlider;
