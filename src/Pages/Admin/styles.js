import { makeStyles } from "@mui/styles";

// Need Responsive

const useStyles = makeStyles(() => ({
  container: {
    width: "100%", // Set to 100% to make it responsive
    maxWidth: "970px !important", // Limit maximum width for larger screens

    marginTop: "50px",

    flexgrow: 1,

    "@media (max-width: 768px)": {
      margin: "20px auto", // Adjust margin for smaller screens
    }

  },
  containerDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '5%'
  },
  progressIndicator: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  progressText: {
    marginTop: "8px",
    color: 'white',
    fontWeight: "bold",
    fontFamily: 'GE_SS_Two_M !important'
  },
  previewContainer: {
    border: `1px gray`,
    padding: '16px',
    borderRadius: '4px',
    marginBottom: '16px',
    backgroundColor: 'gray',
    textAlign: "center", // Align text to the center
  },
  previewTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: '16px',
    fontFamily: 'GE_SS_Two_M !important'
  },
  previewImage: {
    width: "50%",
    maxWidth: "300px",
    marginBottom: '16px',
    borderRadius: '4px',
    boxShadow: '4px',
  },
  previewContent: {
    textAlign: "right",
    marginBottom: '16px',
  },
  previewItem: {
    marginBottom: '8px',
  },
  previewLabel: {
    fontWeight: "bold",
    marginRight: '8px',
    fontFamily: 'GE_SS_Two_M !important'
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },

  TextFieldDiv: {
    width: "100%",
  },
  textField: {
    marginBottom: "15px !important",
    flexWrap: "wrap",
    width: "95%",
    marginLeft: "5% !important",
    fontFamily: 'GE_SS_Two_L !important',
  },
  textFieldSelect: {
    marginBottom: "15px !important",
    flexWrap: "wrap",
    marginLeft: "5% !important",
    fontFamily: 'GE_SS_Two_L !important'
  },
  labelText:{
    backgroundColor: 'white',
    paddingRight: "3px !important",
    fontFamily: 'GE_SS_Two_L !important',
  },
  fieldContainer: {
    display: 'flex',
  },
  autocomplete: {
    width: '95%'
  },
  
  imageFieldContainer: {
    marginBottom: "15px !important",
    flexWrap: "wrap",
    width: "95%",
    border: `1px solid #C4C4C4`,
    borderRadius: '4px',
    padding: '8px',
  },
  imageField: {
    display: "none", // Hide the input element.
  },
  imageFieldLabel: {
    display: "block",
    padding: '8px',
    backgroundColor: '#F9AE3B',
    border: `1px solid darkgray`,
    borderRadius: '4px',
    cursor: "pointer",
    textAlign: "center",
    color: 'white',
    fontFamily: 'GE_SS_Two_M !important',
    maxWidth: '874px',
    width: '100%',
    marginBottom: '10px',
  },
  imageFieldLabel2: {
    display: "block",
    padding: '8px',
    backgroundColor: '#F9AE3B',
    border: `1px solid darkgray`,
    borderRadius: '4px',
    cursor: "pointer",
    textAlign: "center",
    color: 'white',
    fontFamily: 'GE_SS_Two_M !important',
  },
  submitButton: {
    alignSelf: "flex-end",
    marginTop: "5px !important",
    backgroundColor: "#2E3190 !important",
    width: "95%",
    fontFamily: 'GE_SS_Two_M !important'
  },
  saveButton:{
    alignSelf: "flex-end",
    backgroundColor: "#2E3190 !important",
    marginLeft: "8px !important",
    fontFamily: 'GE_SS_Two_M !important'
  },
  cancelButton: {
    backgroundColor: "white",
    color: "#2E3190",
    fontFamily: "GE_SS_Two_B !important",
  },
  snackbarContent: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: '#EDF7ED !important',
    color: 'black !important'
  },
  selectedNewsContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  selectedNewsItem: {
    backgroundColor: "#2E3190",
    borderRadius: '8%',
    padding: '8px',
    marginBottom: '12px',
    marginLeft: 5,
    paddingRight: '5px',
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    textAlign: 'center',
    cursor: "pointer",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    perspective: "1000px",
  },
  selectedNewsText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "120px", // Adjust the maximum width as needed
    backfaceVisibility: "hidden",
  },
  selectedNewsItemHover: {
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  selectedNewsItemContent: {
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },
  selectedNewsTextCenter: {
    textAlign: "center !important",
  },

  popup: {
    position: "fixed",
    width: '100%',
    height: '100%',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.5)",
    padding: '16px',
    borderRadius: '4px',
    boxShadow: "0 2px 4px #F9AE3B",
    zIndex: 9999,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: '16px',

    
    "@media (max-width: 768px)": {
      alignItems: 'center', 
      marginTop: '8px', 
    }
  },

  redAutocompleteInput: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },

  options: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "20px 0",
    cursor: "pointer",

    "& span": {
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: "#2E3190",
      color: "white",
      fontSize: "18px",
      fontFamily: "GE_SS_Two_M",
      "&:hover": {
        backgroundColor: "#1E237C",
      },
    },
  },
  activeOption: {
    border: "3px solid #2E3190",
    fontWeight: "bold",
  },
  Tabs: {
    paddingTop: '30px',
    paddingBottom: '30px',

    "& .MuiTabs-flexContainer" : {
      justifyContent: 'center'
    },

  },
  Tab: {
    fontSize: '20px !important',
    fontFamily: 'GE_SS_Two_L !important',

    "@media (max-width: 768px)": {
      fontSize: '14px !important',
    },
  },

  writerItem: {
    display: 'flex',
    flexDirection: 'column',

    "@media (max-width: 768px)": {
      width: '90vw'
    }
  },
  inputField: {
    marginBottom: '15px',
    fontSize: '15px',
    fontFamily: 'GE_SS_Two_L !important',
    height: '30px',
    padding :'0px 5px',
  },

}));

export default useStyles;
