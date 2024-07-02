import { makeStyles } from "@mui/styles";

// Define the fonts
const mainFont = "AL_Jaz_Bold";
const secondFont = "AL_Jaz_Regular";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,

    maxWidth: "874px",
    margin: "60px auto",
    "@media screen and (max-width: 500px)": {
      width: "auto",
      padding: "0 15px",
    },
  },
  Title: {
    fontSize: "38px",
    fontFamily: `${mainFont} !important`,
    paddingBottom: "25px",

    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  Date_Share: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Date: {
    fontFamily: `${mainFont} !important`,
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
    fontFamily: `${secondFont} !important`,
    paddingTop: "10px",

    "@media (max-width: 768px)": {
      fontSize: "18px",
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

  writerSignture: {
    display: "flex",
    alignItems: "center",
    margin: "25px 0px",
  },
  profileWriter: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "3px solid #F9AE3B",
  },
  writerName: {
    margin: 0,
    fontSize: "14px",
    color: "#2E3190",
    fontFamily: `${mainFont} !important`,
    marginRight: "10PX",
    textDecoration: "none",
  },
}));

export default useStyles;
