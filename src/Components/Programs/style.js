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
    ImageDiv: {
      display: 'flex',
      justifyContent: 'center',
    },
    newsDetailsImage: {
      width: '250px',
      height: 'auto',
        
      "@media (max-width: 768px)": {
          width: '90vw',
          height: 'auto',
          textAlign: 'center',
      },
    },
    progContent: {
        display: 'flex',
        margin: '20px 0'
    },
    dividerContent: {
        display: 'flex',
    },
    divider: {
        backgroundColor: "#F9AE3B",
        width: "13px",
        height: "auto",
    },
    descriptionContent: {
        display: 'flex',
    },
    description: {
        fontSize: "18px",
        fontFamily: "GE_SS_Two_L",
        paddingRight: '15px',
        color: '#2E3190'
    },
    
    EpisodesList:{
        margin: '50px 0',
    },

    EpisodesSliderDiv: {
        padding: '0px 25px',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        
        "@media (max-width: 768px)": {
            width: '90vw'
        },
        
        "& .slick-track": {
          direction: 'rtl',
          width: '52vw'
        },
    
        "& .slick-initialized .slick-slide": {
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
    episodeContent: {
        position:'relative',
        display: 'flex !important',
        justifyContent: 'center',
    },
    episodeYoutubeVideo: {
        width: '208px !important',
        height: '370px !important',
    
        "& iframe": {
          width: "100%",
          height: '100%',
        },
    
        "@media (max-width: 768px)": {
          width: '90vw',
        },  
    },

    EpisodesSliderDiv2: {
        width: 'auto',
        higeht: 'auto',
        
        "@media (max-width: 768px)": {
            width: '90vw'
        },
        
        "& .slick-track": {
          direction: 'rtl',
          width: 'auto',
          height: 'auto !important',
        },
    
        "& .slick-initialized .slick-slide": {
          "@media (max-width: 768px)": {
            display: 'flex',
            justifyContent: 'center',
          },
        },
    },
    episodeContent2: {
        position:'relative',
    },
    episodeYoutubeVideo2: {
        width: 'auto !important',
        height: '330px !important',
    
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
