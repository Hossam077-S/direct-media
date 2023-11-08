import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: '874px',
        margin: '20px auto',
        width: 'auto',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
            minHeight: 'calc(100vh - 500px)', // Adjust 40px based on your header/footer height
        }
    },
    CoverDiv: {
      width: '874px',
      paddingBottom: '10px',

      "@media (max-width: 768px)": {
        marginRight: '0px',
        width: '90vw'
      },
    },
    CoverImage: {
      width : '80%'
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
        paddingRight: '26px',

        "@media (max-width: 768px)": {
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '0px',
        },
      },

      "& .slick-next": {
        opacity: "1",
        zIndex: 1,  
        width: '19px',
        height: '39px',

        "@media (max-width: 768px)": {
          right: '0px',
        },
      },
      "& .slick-prev": {
        opacity: "1",
        zIndex: 1,
        width: '19px',
        height: '39px',
        
        "@media (max-width: 768px)": {
          left: '0px',
        },
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
