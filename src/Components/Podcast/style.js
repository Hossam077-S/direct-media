import { makeStyles } from "@mui/styles";

const secondFont = "AL_Jaz_Regular";

const useStyles = makeStyles(() => ({
  podcastContainer: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    maxWidth: "874px",
    margin: "5vw auto",
    padding: "0 20px", // Add padding to the sides
    "@media screen and (max-width: 500px)": {
      width: "100%", // Adjust the width for smaller screens
      padding: "0 15px",
    },
  },
  imageContainer: {
    marginBottom: "2VW",
  },
  imageLogo: {
    width: "auto",
    maxWidth: "100%", // Ensure the logo doesn't exceed the container's width
  },
  descriptionContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    "@media screen and (max-width: 500px)": {
      marginTop: "20px",
    },
  },
  SliderDivider: {
    backgroundColor: "#F9AE3B",
    width: "13px",
  },
  description: {
    paddingRight: "1vw",
    fontSize: "18px",
    fontFamily: `${secondFont} !important`,
    color: "#2E3190",

    "@media screen and (max-width: 500px)": {
      paddingRight: "10px",
    },
  },
  podcastItemContainer: {
    margin: "3vw 0",
  },
  podcastMediaItems: {},
  podcastContent: {},
  podcastImageCover: {
    width: "252px",
    height: "auto",

    "@media screen and (max-width: 500px)": {
      paddingTop: "50px",
      width: "100%",
    },
  },
}));

export default useStyles;
