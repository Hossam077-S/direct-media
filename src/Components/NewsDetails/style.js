import { makeStyles } from "@mui/styles";

// Define the fonts
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
  Title: {
    fontSize: "38px",
    fontFamily: `${mainFont}`,
    paddingBottom: "25px",

    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  Hashtag: {
    fontSize: "14px",
    fontFamily: `${mainFont}`,
    color: "#2E3190",
    paddingBottom: "10px",
    "@media (max-width: 768px)": {
      fontSize: "12px",
    },
  },
  Date_Share: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Date: {
    fontFamily: `${secondFont}`,
    fontSize: "15px",
    padding: "5px 0",

    "@media (max-width: 768px)": {
      fontSize: "12px",
    },
  },
  shareText: {
    fontFamily: `${mainFont}`,
    fontSize: "15px",
    padding: "5px 0",
    "@media (max-width: 768px)": {
      fontSize: "12px",
      padding: "5px 0",
    },
    "@media (max-width: 320px)": {
      padding: "12px 0",
    },
  },
  shareButtons: {
    display: "flex",
  },

  newsDetailsImage: {
    width: "100%",
    height: "auto",

    "@media (max-width: 768px)": {
      width: "90vw",
      height: "auto",
      textAlign: "center",
    },
  },
  Description: {
    fontSize: "25px",
    fontFamily: `${secondFont}`,
    padding: "15px 0",
    overflow: "hidden",

    "@media (max-width: 768px)": {
      fontSize: "18px",
    },
  },
  Source: {
    fontSize: "14px",
    fontFamily: `${mainFont}`,
    paddingBottom: "25px",

    "@media (max-width: 768px)": {
      fontSize: "12px",
    },
  },
  videoDiv: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "56.25%" /* 16:9 Aspect Ratio (9 / 16 * 100) */,
  },
  youtubeVideo: {
    width: "100% !important",
    "& iframe": {
      width: "100%",
      height: "100%",
      border: "none", // Remove iframe border
    },
  },

  relatedNewsDiv: {
    marginTop: "30px",

    "& .slick-track": {
      height: "100% !important",
    },
    "@media (max-width: 768px)": {
      marginTop: "30px",
    },
  },
  relatedNewsTitle: {
    fontFamily: `${mainFont}`,
    paddingBottom: "15px",
  },
  relatedNewsLi: {
    padding: "15px 0",
    display: "flex !important",
    flexDirection: "row",
    direction: "rtl",
    backgroundColor: "#F0F0F0",
    alignItems: "center",

    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  relatedNewsImage: {
    width: "10vw",
    height: "auto",

    "@media (max-width: 768px)": {
      width: "90vw",
      height: "100%",
      paddingBottom: "15px",
    },
  },
  relatedNewsContent: {
    padding: "0px 15px",
  },
  relatedNewsLink: {
    textDecoration: "none",
    color: "black",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  relatedTitle: {
    fontSize: "18px",
    fontFamily: `${mainFont}`,
    paddingBottom: "5px",
  },
  relatedDescription: {
    fontSize: "12px",
    fontFamily: `${secondFont}`,
    paddingBottom: "5px",
  },
  relatedDate: {
    fontSize: "10px",
    fontFamily: `${secondFont}`,
    paddingBottom: "5px",
  },
}));

export default useStyles;
