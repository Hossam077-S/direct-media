import { makeStyles } from "@mui/styles";

// Define the fonts
const mainFont = "AL_Jaz_Bold";
const secondFont = "AL_Jaz_Regular";

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
    },
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    fontSize: "16px",
    fontFamily: `${secondFont}`,
  },
  checkbox: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "16px",
    fontFamily: `${mainFont}`,
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
    fontFamily: `${mainFont}`,

    "&:hover": {
      backgroundColor: "#1E2278",
    },
  },
}));

export default useStyles;
