import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "970px !important", 
    marginTop: "50px",

    flexgrow: 1,
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
  },
  textFieldSelect: {
    marginBottom: "15px !important",
    flexWrap: "wrap",
    marginLeft: "5% !important",
  
  },
  labelText:{
    backgroundColor: 'white',
    paddingRight: "3px !important",
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
    border: `1px solid gray`,
    borderRadius: '4px',
    padding: '8px',
  },
  imageField: {
    display: "none", // Hide the input element
  },
  imageFieldLabel: {
    display: "block",
    padding: '8px',
    backgroundColor: 'lightgray',
    border: `1px solid darkgray`,
    borderRadius: '4px',
    cursor: "pointer",
    textAlign: "center",
  },
  submitButton: {
    alignSelf: "flex-end",
    marginTop: "5px !important",
    backgroundColor: "#2E3190 !important",
    width: "95%",
  },
  saveButton:{
    alignSelf: "flex-end",
    backgroundColor: "#2E3190 !important",
    marginLeft: "8px !important",
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: '16px',
    borderRadius: '4px',
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 9999,
  },
  popupButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: '16px',
  },
  redAutocompleteInput: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },
  Tabs: {
    paddingTop: '30px',
    paddingBottom: '30px',

    "& .MuiTabs-flexContainer" : {
      justifyContent: 'center'
    }
  },
  Tab: {
    fontSize: '20px !important',
    fontFamily: 'GE_SS_Two_L !important',
  },

  writerItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputField: {
    marginBottom: '15px',
    fontSize: '15px',
    fontFamily: 'GE_SS_Two_L',
  }

}));

export default useStyles;
