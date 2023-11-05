import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";

const VerticalSlider = ({ newsItems, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, interval);

    return () => clearInterval(autoplay);
  }, [newsItems.length, interval]);

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        return (prevIndex + 1) % newsItems.length;
      } else {
        return (prevIndex - 1 + newsItems.length) % newsItems.length;
      }
    });
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <div className="carousel-wrapper">
      <div className="title-and-controls">
        <div className="title">
          <a href={`/news/${newsItems[activeIndex].id}`}>
            {truncate(newsItems[activeIndex].Title, 65)}
          </a>
        </div>
        <div className="controls">
          <button
            type="button"
            className="carousel-button prev"
            onClick={() => handleClick("prev")}
          >
            <ArrowDropDownIcon />
          </button>
          <button
            type="button"
            className="carousel-button next"
            onClick={() => handleClick("next")}
          >
            <KeyboardArrowUpIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

VerticalSlider.propTypes = {
  newsItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Title: PropTypes.string.isRequired,
      summary: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  interval: PropTypes.number, // you can specify the interval as a prop
};

export default VerticalSlider;
