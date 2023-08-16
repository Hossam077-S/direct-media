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
    CoverDiv: {
      marginRight: '-62px',
      paddingBottom: '10px',
    },
    CoverImage: {
    },

    podcastMediaHeader: {
      marginTop: '47px',
      width: '874px',
    },
    podcastMediaItems: {
      width: 'auto',
      display: 'flex',
      flexDirection: 'column',
  
      "@media (max-width: 768px)": {
        width: '90vw'
      },
      
      "& .slick-track": {
        direction: 'rtl'
      },
  
      "& .slick-initialized .slick-slide": {
        width: '288px !important',
        "@media (max-width: 768px)": {
          display: 'flex',
          justifyContent: 'center',
        },
      },

      "& .slick-next": {
        opacity: "1",
        zIndex: 1,  
        width: '19px',
        height: '39px',
        
      },
      "& .slick-prev": {
        opacity: "1",
        zIndex: 1,
        width: '19px',
        height: '39px',
      },
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
