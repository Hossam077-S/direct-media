import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '874px',
        margin: '20px auto',
        width: '640px',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    Title: {
        fontSize: '24px',
        fontFamily: "GE_SS_Two_B",
        paddingBottom: '10px',
    },
    newsDetailsImage: {
        width: '200px',
        height: 'auto',

        "@media (max-width: 768px)": {
            width: '330px',
            height: 'auto',
            textAlign: 'center',
        },
    },
    Description: {
        fontSize: '20px',
        fontFamily: "GE_SS_Two_L",
        paddingTop: '10px',
    },
    VideoDiv: {
      paddingTop: '10px',  
    },
    youtubeVideo: {
       width: '640px',
       height: '360px',
      "& iframe": {
       width: "100%",
       height: '100%',
      },
    
      "@media (max-width: 768px)": {
       width: '90vw',
       height: '186px',
      },
    },

}));

export default useStyles;
