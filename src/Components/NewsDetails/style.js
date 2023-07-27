import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '874px',
        margin: '60px auto',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    Title: {
        fontSize: '24px',
        fontFamily: "GE_SS_Two_B",
        paddingBottom: '15px',
    },
    Date: {
        fontFamily: "GE_SS_Two_L",
        fontSize: "15px",
        padding: "5px 0",
    },
    newsDetailsImage: {
        width: '100%',
        height: 'auto',

        "@media (max-width: 768px)": {
            width: '90vw',
            height: 'auto',
            textAlign: 'center',
        },
    },
    Description: {
        fontSize: '20px',
        fontFamily: "GE_SS_Two_L",
        padding: '15px 0',
    },
    VideoDiv: {
      paddingTop: '10px',  
    },
    youtubeVideo: {
       width: '100% !important',
       height: '100% !important',

      "& iframe": {
       width: "100% !important",
       height: '3vw !important',

       "@media (max-width: 768px)": {
        height: '100% !important',
       },
      },
    
      "@media (max-width: 768px)": {
       width: '90vw',
       height: '100%',
      },
    },

    relatedNewsDiv: {
        marginTop: "15px",

        "& .slick-track": {
            height: '100% !important',
        },
        "@media (max-width: 768px)": {
            marginTop: "30px",

        },
    },
    relatedNewsLi: {
        padding: "15px 0",
        display: 'flex !important',
        flexDirection: 'row',
        direction: 'rtl',
        backgroundColor: '#F0F0F0',
        alignItems: 'center',

        "@media (max-width: 768px)": {
            flexDirection: 'column',
        },
        
    },
    relatedNewsImage: {
        width: "10vw",
        height: 'auto',

        "@media (max-width: 768px)": {
            width: "90vw",
            height: '100%',
            paddingBottom: '15px'
        },
    },
    relatedNewsContent: {
        paddingRight: '15px'
    },
    relatedNewsLink: {
        textDecoration: "none",
        color: "black",

        "&:hover": {
            textDecoration: "underline",
        },
    },
    relatedTitle: {
        fontSize: '18px',
        fontFamily: "GE_SS_Two_L",
        paddingBottom: '5px',

    },
    relatedDescription: {
        fontSize: '12px',
        fontFamily: "GE_SS_M",
        paddingBottom: '5px',
    },
    relatedDate: {
        fontSize: '10px',
        fontFamily: "GE_SS_L",
        paddingBottom: '5px',
    },
}));

export default useStyles;
