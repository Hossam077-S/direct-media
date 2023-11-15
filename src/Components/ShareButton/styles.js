import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  shareButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
    fontSize: "30px",
    color: "#2E3190",
    transition: "color 0.3s, transform 0.3s",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    borderRadius: "50%",
    "&:hover": {
      color: "#F9AE3B",
      transform: "scale(1.1)",
    },
  },
}));
