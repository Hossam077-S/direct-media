import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "874px",
    margin: "5vw auto",
    padding: "0 20px", // Add some padding to the sides
  },
  newsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive grid
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
    textDecoration: 'none',
    color: 'black',

    "&:hover": {
      textDecoration: 'underline',
      textDecorationColor: '#F9AE3B'
    }
  },
}));
