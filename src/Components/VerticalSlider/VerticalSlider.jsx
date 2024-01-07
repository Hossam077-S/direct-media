import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.css";
import { Link } from "react-router-dom";

const VerticalSlider = ({ newsItems, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  let autoplayRef = useRef(null); // Create a ref to store the interval ID

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current); // Clear any existing intervals
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, interval);
  });

  useEffect(() => {
    startAutoplay(); // Start the autoplay when the component mounts
    return () => clearInterval(autoplayRef.current); // Cleanup the interval when the component unmounts
  }, [newsItems.length, interval, startAutoplay]);

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 1) % newsItems.length
          : (prevIndex - 1 + newsItems.length) % newsItems.length;

      startAutoplay(); // Reset the autoplay interval
      return newIndex;
    });
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <div className="carousel-wrapper">
      <div className="title-and-controls">
        <div className="title">
          <Link to={`/news/${newsItems[activeIndex].id}`} key={activeIndex}>
            {truncate(newsItems[activeIndex].Title, 70)}
          </Link>
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
