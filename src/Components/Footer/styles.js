import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    containerFooter: {
        display: 'flex !important',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
        backgroundColor: '#2E3190',

        "@media (max-width: 768px)": {
            width: '100vw',
        },
        "@media screen and (min-width: 768px) and (max-width: 1024px)": {
            width: '100vw',
        }
    },

    DividerHeader: {
        backgroundColor: "#F9AE3B !important",
        height: "9px !important",
    },

    divFooter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        marginBottom: '2vw',
        width:'874px',

        "@media screen and (min-width: 768px) and (max-width: 1024px)": {
            width:'874px',
        },
        "@media (max-width: 768px)": {
            width:'874px',
        },
    },
    menuDetails: {
        display: 'flex',
        paddingTop: '32px',
        paddingLeft: '48px',

        "@media (max-width: 768px)": {
            display: 'none'
          }
    },
    menuDivider: {
        backgroundColor: "#F9AE3B !important",
        width: '5px !important',
        height: "68px !important",
    },
    menuContent: {
        paddingRight: '10px',
        color: 'white',
    },
    menuTitle: {
        fontSize: "31.2px !important",
        fontFamily: "GE_SS_Two_B !important",
        marginBottom: '8px !important',
        marginTop: '-7px !important',  
    },
    menuDescription: {
        fontSize: "17.3px !important",
        fontFamily: "GE_SS_Two_L !important",
    },
    menuSeparator: {
        margin: '0 8px',
        color: 'white',
    },
    menuLink: {
        color: 'white',
        textDecoration: 'none',
    },
    botFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        flexDirection: 'row',
        paddingTop: '51px',

        "@media (max-width: 768px)": {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '24px',
          }
    },
    logoContentDiv: {
        display: 'flex',

        "@media (max-width: 768px)": {
            paddingTop: '3vw',
            paddingLeft: '0px',
          }
    },
    socialMediaDiv: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '10px',
        
    },
    fButton:{
        marginLeft: "1px !important",
    },
    IButton:{
        backgroundColor: "white !important",
        padding: "3.2px !important",
        marginLeft: "0px !important",
    },
    TButton:{
        backgroundColor: "white !important",
        padding: "3.2px !important"
    },
    YButton:{
        backgroundColor: "white !important",
        marginRight: "9px !important",
        padding: "3.2px !important",
    },
    fIcon:{
        fontSize: "15px !important",
        color: "white !important"
    },
    IIcon:{
        color: "#2E3190 !important",
        fontSize: "8.8px !important"
    },
    TWIcon:{
        fontSize: "17px !important",
        color: "white !important",
        marginLeft: "0px !important",
    },
    TIcon:{
        color: "#2E3190 !important", 
        fontSize: "8.8px !important"
    },
    YIcon:{
        color: "#2E3190 !important", 
        fontSize: "8.8px !important"
    },
    logoContentDivider: {
        backgroundColor: "white !important",
        width: '1.4px !important',
        height: "38.5px !important",
    },
    logoDiv: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '15px',
        
    },
    rightsDiv: {
        paddingLeft: '65px',

        "@media (max-width: 768px)": {
            paddingLeft: '0px',
          }
    },
    rightsTextArabic: {
        fontSize: "14.7px !important",
        fontFamily: "GE_SS_Two_L !important",
        color: 'white',
        marginBottom: '0px !important',
    },
    rightsTextEng: {
        fontSize: "15px !important",
        fontFamily: "MP_R !important",
        color: 'white',
        marginBottom: '0px !important',
    },

}))

export default useStyles;
