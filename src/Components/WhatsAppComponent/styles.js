import { makeStyles } from "@mui/styles";

const mainFont = "AL_Jaz_Bold";
const secondFont = "Cairo, sans-serif"; // Updated to use Cairo font

const useStyles = makeStyles(() => ({
  whatsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    "@media (max-width: 960px)": {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  whatsIconContainer: {
    display: "flex",
    justifyContent: "center",
  },
  whatsIconContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(50deg, #13C331 ,#67F680,#75ED89)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Add shadow for the floating effect
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    "@media (max-width: 960px)": {
      width: "115px",
      height: "115px",
    },
  },
  whatsIcon: {
    fontSize: "100px !important",
    color: "white",
    "@media (max-width: 960px)": {
      fontSize: "80px !important",
    },
  },
  whatsContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Title: {
    fontFamily: `${mainFont}`,
  },
  whatsTitle: {
    padding: "10px 0px",
    fontFamily: `${secondFont}`,
    fontSize: "40px",
    color: "#04B821",
    fontWeight: "bold",
    "@media (max-width: 960px)": {
      fontSize: "30px",
    },
  },
  JoinNowButton: {
    backgroundColor: "#09BC3E",
    padding: "3px 25px",
    fontFamily: `${secondFont}`,
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "@media (max-width: 960px)": {
      fontSize: "18px",
    },
  },
  whatsJoinTitle: {
    padding: "10px 0",
    fontFamily: `${secondFont}`,
    fontSize: "20px",
    "@media (max-width: 960px)": {
      fontSize: "18px",
    },
  },
}));

export default useStyles;
