import { makeStyles } from "@mui/styles";

// Define the fonts
const mainFont = "AL_Jaz_Bold";
const secondFont = "AL_Jaz_Regular";

const useStyles = makeStyles(() => ({
  articlContentDiv: {
    display: "flex",
  },
  articlImage_Divider: {
    display: "flex",
  },
  newsList: {
    width: "315px",
    height: "125px",

    "@media (max-width: 768px)": {
      width: "90vw",
    },
  },
  newsListItem: {
    cursor: "pointer",
    paddingLeft: "30px",
    height: "125px",
    overflow: "hidden",
    position: "relative",
    justifyContent: "flex-end",

    transition: "transform 1.2s ease-in-out",

    "&:nth-child(odd)": {
      backgroundColor: "#1B1464",
    },
  },
  newsAvatar: {
    width: "84.8px !important",
    height: "84.8px !important",
    transition: "transform .2s",
    borderRadius: "50%",

    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform .2s",
    },

    "@media (max-width: 768px)": {
      width: "80px !important",
      height: "80px !important",
    },
  },
  activeListItem: {
    width: "315px",
    height: "125px",
    paddingLeft: "30px",
    padding: 0,

    "@media (max-width: 768px)": {
      width: "90vw",
    },
  },
  newsItemContent: {
    display: "flex",
    alignItems: "center",
  },
  descriptionContent: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    width: "186px",
    paddingRight: "12px",

    "@media (max-width: 768px)": {
      flexGrow: 1,
      width: "55vw",
    },
  },
  newsItemTitle: {
    marginLeft: "10px !important",
  },
  articleContent: {
    color: "white",
    fontSize: "12px !important",
    fontFamily: `${mainFont} !important`,
    textAlign: "right",

    "@media (max-width: 768px)": {
      fontSize: "14px !important",
    },
  },
  newsItemDescription: {
    marginLeft: "21px !important",
    color: "white",
    fontSize: "8.4px !important",
    fontFamily: `${secondFont} !important`,

    "@media (max-width: 768px)": {
      fontSize: "10px !important",
    },
  },
  articlDivider: {
    marginRight: "18px",
    opacity: 0,
    position: "absolute",
    left: 0,
    width: "13px",
    top: 0,
    bottom: 0,
    minHeight: "100%",
    transition: "0.2s ease-in-out",
  },
  activeDivider: {
    backgroundColor: "#F9AE3B !important",
    width: "13px !important",
    height: "118px !important",
    opacity: 1,
  },
}));

export default useStyles;
