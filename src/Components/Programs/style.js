import { makeStyles } from "@mui/styles";

const mainFont = "AL_Jaz_Bold";
const secondFont = "AL_Jaz_Regular";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "874px",
    margin: "60px auto",
    "@media screen and (max-width: 500px)": {
      width: "auto",
      padding: "0 15px",
    },
  },
  ImageDiv: {
    display: "flex",
    justifyContent: "center",
  },
  newsDetailsImage: {
    width: "250px",
    height: "auto",

    "@media (max-width: 768px)": {
      width: "90vw",
      height: "auto",
      textAlign: "center",
    },
  },
  progContent: {
    display: "flex",
    margin: "20px 0",
  },
  dividerContent: {
    display: "flex",
  },
  divider: {
    backgroundColor: "#F9AE3B",
    width: "13px",
    height: "auto",
  },
  descriptionContent: {
    display: "flex",
  },
  description: {
    fontSize: "18px",
    fontFamily: `${secondFont}`,
    paddingRight: "15px",
    color: "#2E3190",
  },

  EpisodesList: {
    margin: "50px 0",
  },

  EpisodesSliderDiv: {
    padding: "0px 25px",
    width: "auto",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 768px)": {
      width: "90vw",
    },

    "& .slick-track": {
      direction: "rtl",
      width: "52vw",
    },

    "& .slick-initialized .slick-slide": {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
      },
    },

    "& .slick-next": {
      opacity: "1",
      zIndex: 1,
      width: "19px",
      height: "39px",
    },
    "& .slick-prev": {
      opacity: "1",
      zIndex: 1,
      width: "19px",
      height: "39px",
    },
  },
  episodeContent: {
    position: "relative",
    display: "flex !important",
    justifyContent: "center",
    flexDirection: "column",
  },
  episodeTitle: {
    position: "absolute",
    paddingRight: "3px",
    width: "100%",
    maxWidth: "208px",
    fontFamily: `${mainFont}`,
    fontSize: "16px",
    color: "#2E3190",
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 1,
    top: 0,
  },
  episodeYoutubeVideo: {
    width: "208px !important",
    height: "370px !important",

    "& iframe": {
      width: "100%",
      height: "100%",
    },

    "@media (max-width: 768px)": {
      width: "90vw",
    },
  },
}));

export default useStyles;
