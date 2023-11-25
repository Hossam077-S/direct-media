import { makeStyles } from "@mui/styles";

// Define the fonts
const mainFont = "AL_Jaz_Bold";
const secondFont = "AL_Jaz_Regular";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    textAlign: "center",
  },
  header: {
    fontSize: "4rem",
    color: "#2E3190",
    marginBottom: "1rem",
    fontFamily: mainFont,
  },
  description: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    fontFamily: secondFont,
  },
  link: {
    fontSize: "1.2rem",
    color: "#FBAE3C",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "10px 20px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      color: "#2E3190",
    },
  },
}));

export default useStyles;
