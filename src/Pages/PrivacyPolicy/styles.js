import { makeStyles } from "@mui/styles";

// Define the fonts
const mainFont = "'AL_Jaz_Bold";
const theredFont = "AL_Jaz_Light";

const useStyles = makeStyles(() => ({
  container: {
    padding: "50px 0px",
  },
  TypoHeader: {
    fontFamily: mainFont,
  },
  TypoParag: {
    fontFamily: theredFont,
  },
}));

export default useStyles;
