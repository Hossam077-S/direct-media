import React from "react";
import ReactPlayer from "react-player";

import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import PlayArrowIcon from @mui/icons-material

import useStyles from "./styles";
import LazyImage from "../LazyImage/LazyImage";

function VideoComponent({ videoUrl, thumbnailUrl, cName }) {
  const classes = useStyles();

  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const handleThumbnailClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div>
      {isVideoPlaying ? (
        <ReactPlayer
          url={videoUrl}
          controls
          playing
          className={classes[cName]}
        />
      ) : (
        <div className={classes.thumbnailContainer}>
          <LazyImage
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className={classes[cName]}
            onClick={handleThumbnailClick}
          />
          <div className={classes.playButtonOverlay}>
            <PlayArrowIcon
              className={classes.playButtonIcon}
              onClick={handleThumbnailClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoComponent;
