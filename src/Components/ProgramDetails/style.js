import { makeStyles } from "@mui/styles";

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
        padding: '10px 0',
        fontFamily: "GE_SS_Two_L",
        fontSize: '12px',
    },
    Description: {
        fontSize: '20px',
        fontFamily: "GE_SS_Two_L",
    },
    youtubeVideo: {
       width: '100% !important',
       height: '100% !important',
      "& iframe": {
       height: '30vw !important',
       
       "@media (max-width: 768px)": {
        height: '100% !important',
       },
      },
    
      "@media (max-width: 768px)": {
       width: '90vw !important',
       height: '186px !important',
      },
    },

}));

export default useStyles;
