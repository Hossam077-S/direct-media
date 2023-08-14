import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  youtubeVideo: {
    width: '205px !important',
    height: '364px !important',
    cursor: 'pointer',

    "& iframe": {
      width: "205px !important",
      height: '100%',

      "@media (max-width: 768px)": {
        width: '90vw !important',
      },
    },

    "@media (max-width: 768px)": {
      width: '90vw !important',
    },
  },
  
  podcastYoutubeVideo: {
    width: '244px !important',
    height: '244px !important',
    cursor: 'pointer',

    "& iframe": {
      width: "100%",
      height: '100%',
    },

    "@media (max-width: 768px)": {
      width: '90vw',
    },
  },

  thumbnailContainer: {
    position: "relative",
    display: "inline-block",
  },
  playButtonOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    cursor: "pointer",
  },
  playButtonIcon: {
    fontSize: "50px !important",
    color: "#fff",
  },
  
  episodeYoutubeVideo: {
    width: '208px !important',
    height: '370px !important',

    "& iframe": {
      width: "100%",
      height: '100%',
    },

    "@media (max-width: 768px)": {
      width: '90vw',
    },  
  },

  episodeYoutubeVideo2: {
    width: 'auto !important',
    height: '330px !important',

    "& iframe": {
      width: "100%",
      height: '100%',
    },

    "@media (max-width: 768px)": {
      width: '90vw',
    },  
  },
}));

export default useStyles;
