import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%", // Set to 100% to make it responsive
    maxWidth: "874px", // Limit maximum width for larger screens
    margin: "130px auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",

    "@media (max-width: 768px)": {
      margin: "50px auto",
      padding: "10px", 
    }
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    fontFamily: "GE_SS_Two_L",
  },
  checkbox: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
    fontFamily: "GE_SS_Two_L",
  },
  button: {
    backgroundColor: "#2E3190",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    fontSize: "18px",
    fontFamily: "GE_SS_Two_M",

    "&:hover": {
      backgroundColor: "#1E2278",
    },
  },

}));

export default useStyles;
