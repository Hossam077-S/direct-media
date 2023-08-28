import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  divHeader: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '@media (max-width: 768px)': {
      width: '100vw',
    },

    '@media screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '100vw',
    },
  },
  appBar: {
    display: 'flex',
    height: '50px',
    backgroundColor: '#2E3190 !important',

    '@media (max-width: 768px)': {
      height: '40vw',
      justifyContent: 'center',
    },

    '@media screen and (min-width: 768px) and (max-width: 1024px)': {},
  },
  widthContainer: {
    width: '874px !important',
    padding: '0px !important',

    '@media (max-width: 768px)': {
      width: '60vw !important',
    },
  },
  toolbar: {
    display: 'flex',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingBottom: '14px',

    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  leftheader: {

    '@media (max-width: 768px)': {
      paddingTop: '1vw',
      width: '100%',
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

    '@media (max-width: 768px)': {
      marginRight: '0px'
    },
  },
  searchicon: {
    color: '#2E3190',
    width: '20px',
    height: '20px',
  },
  inputbase: {
    paddingLeft: '5px',
    paddingRight: '10px',
    width: '80px',
    fontSize: '12px !important',
    fontFamily: 'GE_SS_Two_M !important',
    '&::placeholder': {
      opacity: 0.5,
      textAlign: 'center',
    },
  },

  inputbasebigger: {
    width: '100%',
    height: '40px',
    fontSize: '18px !important',
    fontFamily: 'GE_SS_Two_M !important',
    marginBottom: '10px',
  },
  searchiconbigger: {
    color: '#2E3190',
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
  searchResultLink: {
    textDecoration: 'none',
    color: '#2E3190',
    fontSize: '12px !important',
    fontFamily: 'GE_SS_Two_M !important',

    "&:hover": {
      textDecoration: 'underline'
    }
  },
  textFieldSelect: {
    width: '100%',
    textAlign: 'right',
    '& .MuiInputLabel-root': {
      fontFamily: 'GE_SS_Two_M',
    },
    '& .MuiInputBase-input': {
      fontFamily: 'GE_SS_Two_M',
    },
  },
  
  socialmediaiconbox: {
    flexGrow: 1,
    textAlign: 'left',

    '@media (max-width: 768px)': {
      textAlign: 'center',
      width: '100%',
    },
  },

  todaydatebox: {
    display: 'flex',

    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  todaydatetext: {
    fontFamily: 'GE_SS_Two_L !important',
    fontSize: '16.83px !important',

    '@media (max-width: 768px)': {
      fontSize: '18px !important',
    },
  },
  //Social Media Icon
  fButton: {
    marginLeft: '4px !important',
  },
  IButton: {
    backgroundColor: 'white !important',
    padding: '4px !important',
    marginleft: '2px !important',
  },
  TButton: {
    backgroundColor: 'white !important',
    padding: '4px !important',
  },
  YButton: {
    backgroundColor: 'white !important',
    marginRight: '11px !important',
    padding: '4px !important',
  },
  fIcon: {
    fontSize: '21px !important',
    color: 'white !important',
  },
  IIcon: {
    color: '#2E3190 !important',
    fontSize: '13px !important',
  },
  TWIcon: {
    fontSize: '24px !important',
    color: 'white !important',
    marginLeft: '2px !important',
  },
  TIcon: {
    color: '#2E3190 !important',
    fontSize: '13px !important',
  },
  YIcon: {
    color: '#2E3190 !important',
    fontSize: '13px !important',
  },
  //Menu
  gridContainer: {
    justifyContent: 'center',
    marginTop: '27px !important',
    marginBottom: '5px !important',

    maxWidth: '874px', // Set the maximum width


    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
  gridMenu: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px !important',

    width: '100%', // Occupy the entire available width
    justifyContent: 'space-between', // Space between items

    '@media (max-width: 768px)': {
      flexDirection: 'column', // Stack items vertically on smaller screens
      alignItems: 'center',
    },
  },
  divider: {
    backgroundColor: '#F9AE3B !important',
    width: '2px !important',
    height: '72px !important',
    marginRight: '30px !important',
    marginLeft: '30px !important',

    '@media (max-width: 768px)': {
      height: '60px !important',
    },
  },
  logoHeader: {
    width: '225px',
    height: '50px',

    '@media (max-width: 768px)': {
      width: '150px',
      height: '40px',
    },
  },
  linkMenu: {
    color: '#2E3190',
    position: 'relative',
    fontSize: '17.33px !important',
    fontFamily: 'GE_SS_Two_M',
    textDecoration: 'none',
    paddingLeft: '19px !important',
    transition: 'transform 0.2s ease-in-out', // Add a transition effect for the transform property
    whiteSpace: 'nowrap', // Add this property to prevent wrapping

    '&.active': {
      // Use the .active class selector
      textDecoration: 'underline',
      textDecorationColor: '#F9AE3B',
      transition: 'opacity 0.2s',
      textDecorationThickness: '2px',
      textUnderlineOffset: '15px',
    },

    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: '#F9AE3B',
      transition: 'opacity 0.2s !important',
      textDecorationThickness: '2px',
      textUnderlineOffset: '15px',
    },
  },
}));