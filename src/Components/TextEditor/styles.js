import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: "95%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    "@media screen and (max-width: 500px)": {
      width: "auto",
      padding: "0 15px",
    },
  },
  editorWrapper: {
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    minHeight: "400px",
    "@media screen and (max-width: 500px)": {
      width: "auto",
      padding: "0 15px",
    },
  },
  toolbar: {
    borderBottom: "1px solid white",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px 8px 0 0",
    direction: "ltr",
  },
  editor: {
    minHeight: "300px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "0 0 8px 8px",
  },
}));

export default useStyles;
