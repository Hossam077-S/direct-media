import React from "react";
import ReactPlayer from "react-player";

import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import PlayArrowIcon from @mui/icons-material

import useStyles from "./styles";

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
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            onClick={handleThumbnailClick}
            className={classes[cName]}
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
