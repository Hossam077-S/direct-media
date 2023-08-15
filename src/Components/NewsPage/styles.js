import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    width: "874px",
    margin: "5vw auto",
  },
  newsList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  newsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newsImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  newsContent: {
    paddingTop: "10px",
  },
  newsTitle: {
    fontFamily: 'GE_SS_Two_B !important',
    paddingBottom: "10px",
  },
  newsDescription: {
    fontFamily: 'GE_SS_Two_L !important',
  },
  LinkInnerPages: {
    "text-decoration": 'none',
    color: 'black',

    "&:hover": {
      "text-decoration": 'underline',
      "text-decoration-color": '#F9AE3B'
    }
  },
}));
