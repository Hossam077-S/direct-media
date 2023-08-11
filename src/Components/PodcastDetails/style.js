import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: '874px',
        margin: '20px auto',
        width: 'auto',
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

    podcastMediaHeader: {
        marginTop: '47px',
      },
      podcastMediaItems: {
        width: 'auto',
    
        "@media (max-width: 768px)": {
          width: '90vw'
        },
       
        "& .slick-track": {
          direction: 'rtl'
        },
    
        "& .slick-initialized .slick-slide": {
          "@media (max-width: 768px)": {
            display: 'flex',
            justifyContent: 'center',
          },
        }
      },
      podcastContent: {
        position: 'relative',
      },
      podcastYoutubeVideo: {
        width: '245px !important',
        height: 'auto',
    
        "& iframe": {
          width: "100%",
          height: '100%',
        },
    
        "@media (max-width: 768px)": {
          width: '90vw',
        },
      },

}));

export default useStyles;
