import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '874px',
        margin: '60px auto',
        height: '35vw',
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
        padding: '10px 0',
        fontFamily: "GE_SS_Two_L",
        fontSize: '12px',
    },
    Description: {
        fontSize: '20px',
        fontFamily: "GE_SS_Two_L",
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
