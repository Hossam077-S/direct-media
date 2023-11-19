import { makeStyles } from "@mui/styles";

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
    fontFamily: "GE_SS_Two_B",
    paddingBottom: "25px",

    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  Hashtag: {
    fontSize: "14px",
    fontFamily: "GE_SS_Two_B",
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
    fontFamily: "GE_SS_Two_L",
    fontSize: "15px",
    padding: "5px 0",

    "@media (max-width: 768px)": {
      fontSize: "12px",
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
    fontFamily: "GE_SS_Two_L",
    padding: "15px 0",
    overflow: "hidden",

    "@media (max-width: 768px)": {
      fontSize: "18px",
    },
  },
  Source: {
    fontSize: "14px",
    fontFamily: "GE_SS_Two_M",
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
    fontFamily: "GE_SS_Two_B",
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
    fontFamily: "GE_SS_Two_M",
    paddingBottom: "5px",
  },
  relatedDescription: {
    fontSize: "12px",
    fontFamily: "GE_SS_Two_L",
    paddingBottom: "5px",
  },
  relatedDate: {
    fontSize: "10px",
    fontFamily: "GE_SS_L",
    paddingBottom: "5px",
  },
}));

export default useStyles;
