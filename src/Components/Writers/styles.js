import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "874px",
    margin: "5vw auto",
    padding: "0 20px", // Add some padding to the sides

    "@media (max-width: 768px)": {
      margin: "12vw auto",
    }
  },
  newsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive grid
    gap: "20px",
    textAlign: "center",
  },
  newsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newsImage: {
    width: "50%",
    height: "auto",
    objectFit: "contain",
    borderRadius: '50%',
    border: '2px solid #F9AE3B',

    transition: 'transform 0.3s, border-color 0.3s',

    "&:hover": {
      transform: 'scale(1.1)',
      borderColor: '#2E3190',
    }

  },
  newsContent: {
    paddingTop: "10px",
    textAlign: 'center',
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
