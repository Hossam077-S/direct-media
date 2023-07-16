import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  divHeader: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    "@media (max-width: 768px)": {
      
    }
  },
  appBar: {
    display: 'flex',
    height: '50px',
    backgroundColor: "#2E3190 !important",
    
    "@media (max-width: 768px)": {
      
    }
  },
  widthContainer:{
    width: "874px !important",
    padding: "0px !important"
  },
  toolbar: {
    display: 'flex',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingBottom: '14px'
  },
  leftheader: {
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      justifyContent: 'center',
    },
  },
  searchbox: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: '5px 5px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '22.4px',
    marginRight: '12px',
  },
  searchicon: {
    color: '#2E3190',
    width: "20px",
    height: '20px'
  },
  inputbase: {
    paddingLeft: '5px',
    paddingRight: '10px',
    width: '80px',
    fontSize: "12px !important",
    fontFamily: "GE_SS_Two_M !important",
    '&::placeholder': {
      opacity: 0.5,
      textAlign: 'center',
    },
  },
  socialmediaiconbox: {
    flexGrow: 1,
    textAlign: 'left',
  },
  todaydatebox: {
    display: 'flex',  
  },
  todaydatetext: {
    fontFamily: "GE_SS_Two_L !important",
    fontSize: '16.83px !important',
  },
  //Social Media Icon
  fButton:{
    marginLeft: "4px !important",
  },
  IButton:{
    backgroundColor: "white !important",
    padding: "4px !important",
    marginleft: "2px !important",
  },
  TButton:{
    backgroundColor: "white !important",
    padding: "4px !important"
  },
  YButton:{
    backgroundColor: "white !important",
    marginRight: "11px !important",
    padding: "4px !important",
  },
  fIcon:{
    fontSize: "21px !important",
    color: "white !important"
  },
  IIcon:{
    color: "#2E3190 !important",
    fontSize: "13px !important"
  },
  TWIcon:{
    fontSize: "24px !important",
    color: "white !important",
    marginLeft: "2px !important",
  },
  TIcon:{
    color: "#2E3190 !important", 
    fontSize: "13px !important"
  },
  YIcon:{
    color: "#2E3190 !important", 
    fontSize: "13px !important"
  },
  //Menu
  gridContainer:{
    justifyContent: "flex-start",
    marginTop: '27px !important',
    marginBottom: '5px !important',
  },
  gridMenu: {  
    display: 'flex',
    alignItems: 'center',
    padding: '0px !important'
  },
  divider: {
    backgroundColor: "#F9AE3B !important",
    width: "2px !important",
    height: "72px !important",
    marginRight: "30px !important",
    marginLeft: "30px !important",
  },
  linkMenu: {
    color: "#2E3190",
    position: "relative",
    fontSize: "17.33px !important",
    fontFamily: "GE_SS_Two_M",
    textDecoration: "none",
    paddingLeft: "19px !important",
    transition: "transform 0.2s ease-in-out", // Add a transition effect for the transform property
    whiteSpace: 'nowrap', // Add this property to prevent wrapping

    "&.active": { // Use the .active class selector
      textDecoration: "underline",
      textDecorationColor: "#F9AE3B",
      transition: "opacity 0.2s",
      textDecorationThickness: "2px",
      textUnderlineOffset: "15px",
    },
    
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "#F9AE3B",
      transition: "opacity 0.2s !important",
      textDecorationThickness: "2px",
      textUnderlineOffset: "15px",

    },
  },
  
}));