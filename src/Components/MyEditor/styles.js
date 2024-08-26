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
  editor: {
    border: "1px solid #ddd",
    padding: "10px",
    minHeight: "200px",
    cursor: "text",
  },
  image: {
    display: "block",
    maxWidth: "100%",
    margin: "10px 0",
  },
  "align-left": {
    textAlign: "left",
  },
  "align-center": {
    textAlign: "center",
  },
  "align-right": {
    textAlign: "right",
  },
}));

export default useStyles;
