import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%", 
    maxWidth: '874px !important',
    padding: "0px !important", 
    marginTop: "23px !important",

    "@media (max-width: 768px)": {
      width: "90vw !important",
      marginTop: "16px !important", // Adjust the margin as needed

    },

    "@media screen and (min-width: 768px) and (max-width: 1024px)": {
      width: "90vw !important",
    },
  },
  
  slicerDiv: {
    overflow: "hidden",
    border: "1px solid",
    borderColor: "#2E3190",
    maxHeight: '43px',

    "& .MuiStack-root.css-1d9cypr-MuiStack-root": {
      alignItems: 'flex-start'
    },

    "@media (max-width: 768px)": {
      height: "55px",
    }
  },
  imageDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  imageTitle: {
    position: "absolute",
    paddingRight: '2%',
    color: "white",
    fontFamily: "GE_SS_Two_M !important",
    fontSize: "17.33px !important",
    zIndex: 2, // Ensure it's above the image if they overlap


    "@media (max-width: 768px)": {
      fontSize: "15px !important",
      paddingRight: '5%',
    }
  },
  ImportantNewsImage: {
    objectFit: 'contain',
    "@media (max-width: 768px)": {
      width: "110px",
      height: "53px",
      marginTop: '0px',
    }
  },
  importantNewSkeletonDiv: {
    width: "100%",
    paddingTop: '5px',
  },
  importantNewSkeleton: {
      marginLeft: "10%",
      marginRight: "1%",

      "@media (max-width: 768px)": {
        height: "12vw !important",
      }
  },

  gridSlidersContainer: {
    marginTop: '38px',

    "@media (max-width: 768px)": {
      flexDirection: 'column !important',
    },

    "@media screen and (min-width: 768px) and (max-width: 1024px)": {
      justifyContent: 'center',
    },
  },

  videoStack: {
    marginRight: '28px !important',
    marginLeft: '0px !important',

    "@media (max-width: 768px)": {
      marginRight: '0px !important'
    },
  },
  youtubeVideo: {
    width: '205px !important',
    height: '364px !important',

    "& iframe": {
      width: "205px !important",
      height: '100%',

      "@media (max-width: 768px)": {
        width: '90vw !important',
      },
    },

    "@media (max-width: 768px)": {
      width: '90vw !important',
    },
  },
  imageDiv2: {
    display: "flex",
    position: "relative",
    width: '205px',
  },
  imageTitle2: {
    position: "absolute",
    top: '12%',
    left: "11%",
    textAlign: "center",
    color: "#2E3190",
    fontSize: "23px !important",
    fontFamily: "GE_SS_Two_M !important",
    
    "@media (max-width: 768px)": {
      
    },
  },
  newsImageDiv: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '642px',

    "@media (max-width: 768px)": {
      width: '90vw',
      paddingBottom: '4vw',
    },
    
    "& .slick-next": {
      position: 'absolute',
      top: "50% !important", 
      right: "4% !important",
      opacity: "0.4",
      zIndex: 1,  
      width: '19px',
      height: '39px',
    },
    "& .slick-prev": {
      position: "absolute",
      top: "50% !important", 
      left: "4% !important",
      opacity: "0.4",
      zIndex: 1,
      width: '19px',
      height: '39px',
    },
  },

  allnewsImage: {
    width: "642px",
    height: "425px",

    "@media (max-width: 768px)": {
      width: "90vw",
      height: "auto",
    },
    
  },
  sliderItem: {  
    position: 'relative', 
  },
  sliderDetailsDiv: {
    position: "absolute",
    bottom: "0",
    right: "0px",
    direction: 'rtl',
    
    backgroundColor:" rgba(0,0,0,.5)",

    display: 'flex',
    justifyContent: 'start',

    width: '100%',

    minHeight: '150px'
  },
  sliderContent: {
   paddingTop: '28px',
   paddingRight: '23px',
   paddingLeft: '23px',

   "@media (max-width: 768px)": {
    paddingTop: '20px',
    paddingRight: '18px',
    paddingLeft: '18px',
  },
  },
  SliderDivider: {
    backgroundColor: "#F9AE3B",
    width: "13px",
  },
  sliderNewsTitle : {
    color: 'white',
    fontFamily: 'GE_SS_Two_B !important',
    fontSize: '22px !important',

    textAlign: 'right',
    lineHeight: '1.2 !important',
    
    marginBottom: '6px !important',
    
    direction: "rtl",

    "@media (max-width: 768px)": {
      fontSize: '18px !important',
    },
  },
  sliderNewsDescription: {
    color: 'white',
    
    fontFamily: 'GE_SS_Two_L !important',
    fontSize: '18px !important',
    lineHeight: '1.2 !important',

    direction: "rtl",

    "@media (max-width: 768px)": {
      fontSize: '14px !important',
    },
  },
  skeletonSlider:{
    height: "425px !important",
    width: "642px",

    "@media (max-width: 768px)": {
      height: "118vw !important",
      width: "90vw",
      marginBottom: "4vw",
    },
  },
  
  
  adsContainer: {
    display: 'flex',
    backgroundColor: "#F1F1F1",
    marginTop: '33px',
    width: "100%",
    height: "102px",
    alignItems: 'center',
    justifyContent: 'center',
  },
  adsText: {
    fontSize: "38.7px !important",
    fontFamily: "GE_SS_Two_M !important",
    color: '#2E3190',
  },
  
  programContainer: {
    paddingTop: '38px',

    // Responsive flex direction for screens up to 768px
    "@media (max-width: 768px)": {
      flexDirection: 'column !important',
    },

    // Responsive justifyContent for screens between 768px and 1024px
    "@media screen and (min-width: 768px) and (max-width: 1024px)": {
      justifyContent: 'center',
    },
  },
  programHeader: {
    position: 'relative',
  },
  programDivider: {
    backgroundColor: "#F9AE3B !important",
    height: "5px !important",
  },
  programText: {
    position: 'absolute',
    backgroundColor: 'white',
    top:"-18px",
    left: "50%", // Center the text horizontally
    transform: "translateX(-50%)", // Center the text horizontally
    paddingLeft: '7px',
    paddingRight: '7px',
    color: '#2E3190',
    fontSize: "23px !important",
    fontFamily: "GE_SS_Two_M !important",
  },
  programSlider: {
    whiteSpace: 'nowrap', // Prevent items from wrapping to new lines
    width: '100%',
  },
  programItems: {
    marginTop: '27px',
    width: '100%',
  },
  programImage: {
    width: "170px !important",
    height: "94.2px !important",
    
    "@media (max-width: 768px)": {
      width: "100% !important",
      height: "100% !important",
    },
  },

  newsTypesHeader: {
    display: 'flex',
    paddingTop: '42px',
    "@media (max-width: 768px)": {
      flexDirection: 'column',
    },
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '89px',

    "@media (max-width: 768px)": {
      marginLeft: '0px',
      paddingBottom: "10vw",
    },
  },
  globalHeaderDiv: {
    display: 'flex',
    position: 'relative',
    width: '233px',

    "@media (max-width: 768px)": {
      width: '100%',
    },
  },
  globalDivider: {
    backgroundColor: "#F9AE3B !important",
    width: '98%',
    height: "5px !important",
  },
  globalDivider2: {
    backgroundColor: "#F9AE3B !important",
    width: '98%',
    height: "5px !important",
  },
  globalText: {
    position: 'absolute',
    top: '-17px',
    right: 0,
    color: '#2E3190',
    fontSize: '23px !important',
    fontFamily: 'GE_SS_Two_M !important',
    backgroundColor: "white",
    paddingLeft: '10px',
  },
  newsTypeSlider: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',

    "@media (max-width: 768px)": {
      paddingBottom: '20px',
      marginTop: '25px',
    },

    "& .slick-list": {
      width: '228px',

      "@media (max-width: 768px)": {
        width: '90vw',
      },
    },

    "& .slick-next": {
      position: 'relative',
      top: '20px',
      left: '213px',
      backgroundColor: '#DCDCDC !important',
      padding: '1px',

      "@media (max-width: 768px)": {
        position: 'absolute',
        top: 'unset',
        left: 'unset',
        bottom: '-10%',
        right: '0%',
      },

    },
    "& .slick-prev": {
      position: 'relative',
      top: "100%",
      left: "82%",
      backgroundColor: '#DCDCDC !important',
      padding: '1px',

      "@media (max-width: 768px)": {
        position: 'absolute',
        top: 'unset',
        left: 'unset',
        bottom: '-10%',
        right: '8%',
      },

    },
  },
  newsTypeSliderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-start',
    paddingBottom: "3.4px",
    direction: 'rtl',
    height: 'auto'
  },
  newsTypeSliderItems: {
    display: 'flex',
    flexDirection: 'column',
  },
  newsTypeSliderText: {
    paddingTop: '10px',
    paddingRight: '10px',
    fontSize: '10px !important',
    fontFamily: 'GE_SS_Two_M !important',

    "@media (max-width: 768px)": {
      fontSize: '12px !important',
    },

  },
  newsTypeSliderDate: {
    paddingRight: '10px',
    marginTop: '10px',
  },
  newsTypeSliderDateWord: {
    fontSize: '8px !important',
    fontFamily: 'GE_SS_Two_M !important',
  },
  newsTypeSliderDateText: {
    fontSize: '8px !important',
    fontFamily: 'GE_SS_Two_M !important',
    color: '#2E3190'
  },
  newsTypeSliderImage: {
    width: '75px !important',
    height: '75px !important',
  },

  containerDiv2: {
    backgroundColor: '#F0F0F0 !important',
    paddingTop: '50px',
    marginTop: '24px',
    height: '720px',
    
    "@media (max-width: 768px)": {
      height: '100%',
      paddingBottom: '10vw'      
    },
  },
  container2: {
    padding: "0px !important", 
    width: "874px !important", 

    "& .MuiStack-root": {
      "@media (max-width: 768px)": {
        flexDirection: 'column',
      },
    }
  },
  
  articlStack: {
    backgroundColor: '#2E3190',
    minWidth: '315px',
    overflow: 'hidden',
    marginLeft: '0px !important',
    marginRight: '32px !important',

    "@media (max-width: 768px)": {
      height: '38.2rem',
      width: '90vw',
      marginRight: '15px !important',
      minWidth: '90vw',
    },
  },
  articlDivTitle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '10px',
  },
  articlTitleHeader: {
    fontSize: '32.9px !important',
    fontFamily: "GE_SS_Two_M !important",
    color: '#FFFFFF',
    textAlign: 'center',
    "@media (max-width: 768px)": {
      fontSize: '28px !important',
    },
  },
  articlTitleParg: {
    fontSize: '22.2px !important',
    fontFamily: "GE_SS_Two_L !important",
    color: '#FFFFFF',
    textAlign: 'center',

    "@media (max-width: 768px)": {
      fontSize: '20px !important',
    },
    
  },
  articlContentDiv: {
    display: 'flex',
  },
  articlImage_Divider: {
    display: 'flex',
  },
  newsList: {
    width: '315px',
    height: '125px',

    "@media (max-width: 768px)": {
      width: '90vw',
    },
  },
  newsListItem: {
    cursor: 'pointer',
    paddingLeft: '30px',
    height: '125px',
    overflow: 'hidden',
    position:'relative',
    justifyContent: 'flex-end',

    transition: 'transform 1.2s ease-in-out',

    "&:nth-child(odd)": {
      backgroundColor: '#1B1464'
    }

  },
  newsAvatar: {
    width: '84.8px !important',
    height: '84.8px !important',
    transition: 'transform .2s',
    borderRadius: '50%',

    "&:hover": {
      transform: 'scale(1.1)',
      transition: 'transform .2s',
    },

    "@media (max-width: 768px)": {
      width: '80px !important',
      height: '80px !important',
    },
  },
  activeListItem: {
    width: '315px',
    height: '125px',
    paddingLeft: '30px',
    padding: 0,
        
    "@media (max-width: 768px)": {
      width: '90vw',
    },
  },
  newsItemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  descriptionContent: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    width: '186px',
    paddingRight: '12px',

    "@media (max-width: 768px)": {
      flexGrow: 1,
      width: '55vw',
    },
  },
  newsItemTitle: {
    marginLeft: '10px !important',
  },
  articleContent: {
    color: 'white',
    fontSize: '12px !important',
    fontFamily: 'GE_SS_Two_B !important',
    textAlign: 'right',

    "@media (max-width: 768px)": {
      fontSize: '14px !important',
    },

  },
  newsItemDescription: {
    marginLeft: '21px !important',
    color: 'white',
    fontSize: '8.4px !important',
    fontFamily: 'GE_SS_Two_L !important',

    "@media (max-width: 768px)": {
      fontSize: '10px !important',
    },
  },
  articlDivider: {
    marginRight: '18px',
    opacity: 0,
    position:'absolute',
    left: 0,
    width: '13px',
    top: 0,
    bottom: 0,
    minHeight: '100%',
    transition: '0.2s ease-in-out',
  },
  activeDivider: {
    backgroundColor: "#F9AE3B !important",
    width: "13px !important",
    height: "118px !important",
    opacity: 1,
  },
  articlWriterImage: {
    borderRadius: "50%"
  },
  articlDescription_Name: {

  },

  articlImageDiv: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '527px',

    "@media (max-width: 768px)": {
      width: '90vw',
      justifyContent: 'flex-end',
      marginRight: '4vw',
    },

    "& .slick-next": {
      position: 'absolute',
      top: "50% !important", 
      right: "4% !important",
      opacity: "0.4",
      zIndex: 1,  
      width: '19px',
      height: '39px',
    },
    "& .slick-prev": {
      position: "absolute",
      top: "50% !important", 
      left: "4% !important",
      opacity: "0.4",
      zIndex: 1,
      width: '19px',
      height: '39px',
    },
  },
  sliderDetailsDiv2: {
    position: "absolute",
    top: "75%",
    right: "0px",
    
    backgroundColor: '#2E3190',

    display: 'flex',
    justifyContent: 'end',

    width: '100%',
    height: '100%',

    "@media (max-width: 768px)": {
      bottom: "0",
      top: "unset",
      height: "auto",
    },

  },
  articleContentnewsImage: {
    width: "527px",
    height: "319px",

    "@media (max-width: 768px)": {
      width: "90vw",
      height: "auto",
    },
  },
  title_dividerArticl: {
    padding: '20px',
    
    "@media (max-width: 768px)": {
      padding: '10px',
    },
  },
  articlSliderDivider: {
    backgroundColor: "#F9AE3B",
    width: "15px",
  },
  sliderArticlTitle: {
    color: 'white',
    fontFamily: 'GE_SS_Two_M !important',
    fontSize: '15px !important',
    animation: "$slideInTitle 2s ease-in-out",
    textAlign: 'right',

    "@media (max-width: 768px)": {
      fontSize: '12px !important',
      
    },
  },
  sliderArticlDate: {
    color: 'white',
    fontFamily: 'GE_SS_Two_L !important',
    fontSize: '10px !important',
    animation: "$slideInTitle 2s ease-in-out",
    textAlign: 'right',
    direction: 'rtl',
  },
  
  threeNewsContainer: {
    display: 'flex',
    marginTop: '32px',
    justifyContent: 'space-between',

    "@media (max-width: 768px)": {
      marginRight: '4vw',
      paddingBottom: '10vw',
      flexDirection: 'column',
    },
  },
  newsThreeSlider: {
    position: 'relative',
    display: 'flex',

    "@media (max-width: 768px)": {
      paddingLeft: '0px',
      paddingBottom: '4%',
    },

    "& .slick-slider.slick-initialized":{
      width: '160px',
      height: '258px',

      "@media  (max-width: 320px)": {
        height: '100%',
      },

      "@media (max-width: 768px)": {
        width: '90vw',
        height: '100%',
      },

      "@media screen and (min-width: 768px) and (max-width: 1024px)": {

      },
    },

    "& .slick-next": {
      position: 'absolute',
      top: "100%", 
      right: "0%",
      zIndex: 1,  
      padding: '0px',
      marginTop: '15px',

      "@media (max-width: 768px)": {
        bottom: "0%",
        marginTop: '15px',
      },
    },

    "& .slick-prev": {
      position: "absolute",
      top: "100%", 
      left: "75%",
      zIndex: 1,
      padding: '0px',
      marginTop: '15px',

      "@media (max-width: 768px)": {
        left: "unset",
        bottom: "0%",
        right: '8%',
        marginTop: '15px'
      },
      "@media screen and (min-width: 768px) and (max-width: 1024px)": {
        right: '4%',
      },
    },
  },
  threeSlidersContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ThreeSlider: {
    position: 'relative',
    backgroundColor: 'white',
  },
  threenewsImage: {
    width: "160px",
    height: "121px",
    
    "@media (max-width: 768px)": {
      width: '100%',
      height: '100%',
    },

  },
  title_description_threeSlider: {
    height: '137px',
    paddingRight: '15px',
    paddingLeft: '19px',
    paddingTop: '14px',
    display: 'flex',
    flexDirection: 'column',

    "@media (max-width: 768px)": {
      paddingRight: '10px',
      paddingLeft: '10px',
    },
  },
  sliderThreeTitle: {
    fontSize: '10px !important',
    fontFamily: 'GE_SS_Two_M !important',
    textAlign: 'right',

    "@media (max-width: 768px)": {
      fontSize: '14px !important',
    },
    
  },
  sliderThreeDescription: {
    fontSize: '8px !important',
    fontFamily: 'GE_SS_Two_L !important',
    textAlign: 'right',
    flexGrow: 1,
    lineHeight: 1.5,
    direction: 'rtl',

    "@media (max-width: 768px)": {
      fontSize: '12px !important',
    },
  },
  sliderThreeTypeAndDate: {
    fontSize: '7px !important',
    fontFamily: 'GE_SS_Two_M !important',
    color: '#CACACA',
    direction: 'rtl'
  },
  SkeletonNews2: {
    height: "633px !important",
    width: '527px',
  },

  containerDiv3: {
    marginTop: '32px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    
    "@media (max-width: 768px)": {
      height: 'auto', 
    },
  },
  videoImageDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  videoImage: {
    width: '100%',
    height: 'auto',

    "@media (max-width: 768px)": {
      maxWidth: '100%',
    },
  },

  containerDiv4: {
    display: 'flex !important',
    justifyContent: 'center',
    marginTop: '74px',
  },
  writerContainer: {
    maxWidth: '874px !important',
    width: '100%',

    "@media (max-width: 768px)": {
      width: '90vw !important',
    },
  },
  writerHeader: {
    position: 'relative',
  },
  writerDivider: {
    backgroundColor: "#F9AE3B !important",
    height: "5px !important",
  },
  writerText: {
    position: 'absolute',
    backgroundColor: 'white',
    top:"-18px",
    left: "50%", // Center the text horizontally
    transform: "translateX(-50%)", // Center the text horizontally
    paddingLeft: '7px',
    paddingRight: '7px',
    color: '#2E3190',
    fontSize: "23px !important",
    fontFamily: "GE_SS_Two_M !important",
  },

  writerDetails: {
    marginTop: '32px',
  },
  writerItems: {
    marginTop: '27px',
    textAlign: 'start',

    "@media (max-width: 768px)": {
      width: '90vw',
    },
    "& .slick-initialized .slick-slide": {
      "@media (max-width: 768px)": {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
  writerImage: {
    width: "166px",
    height: "166px",

    transition: 'transform .2s',

    "&:hover": {
      transform: 'scale(1.05)',
      transition: 'transform .2s',
    },
  },
  writerTitle: {
    paddingTop: '12px',
    color: '#2E3190',
    fontSize: "17.3px !important",
    fontFamily: "GE_SS_Two_L !important",
    marginRight: '38px !important',

    "@media (max-width: 768px)": {
      marginRight: '0px !important',
      textAlign: 'center',
    },
  },

  containerDiv5: {
    paddingTop: '50px',
  },
  podcastDiv: {
    display: 'flex',
    justifyContent: 'center',
    height: '193.3px',
  },
  podcastImage: {
    "@media (max-width: 768px)": {
      width: '100%',
      height: 'auto',
    },
  },

  containerDiv6: {
    marginTop: '53px',
    display: 'flex !important',
    justifyContent: 'center',

    "@media screen and (min-width: 768px) and (max-width: 1024px)": {
      marginTop: '18vw',
    },
  },
  podcastContainer: {
    maxWidth: '874px',
    width: '100%',
    
    "@media (max-width: 768px)": {
      width: '90vw !important',
    },
  },
  podcastHeader: {
    position: 'relative',
  },
  podcastDivider: {
    backgroundColor: "#F9AE3B !important",
    height: "5px !important",
  },
  podcastText: {
    position: 'absolute',
    backgroundColor: 'white',
    top:"-18px",
    left: "50%", // Center the text horizontally
    transform: "translateX(-50%)", // Center the text horizontally
    paddingLeft: '7px',
    paddingRight: '7px',
    color: '#2E3190',
    fontSize: "23px !important",
    fontFamily: "GE_SS_Two_M !important",
  },
  podcastMediaHeader: {
    marginTop: '47px',
  },
  podcastMediaItems: {
    padding: '0px 25px',
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',

    "@media (max-width: 768px)": {
      width: '86vw',
    },
   
    "& .slick-track": {
      direction: 'rtl',
    },

    "& .slick-initialized .slick-slide": {
      paddingRight: '16px',
            
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
    width: '244px !important',
    height: '244px !important',

    "& iframe": {
      width: "100%",
      height: '100%',
    },

    "@media (max-width: 768px)": {
      width: '90vw',
    },
  },
  podcastMediaImage: {
    width: "242px !important",
    height: "242px !important",
  },
  playButton: {
    position: 'absolute !important',
    bottom: 0,
  },
  playButtonIcon: {
    fontSize: "50px !important",
    color: 'white',
    backgroundColor: '#F9AE3B',
    borderRadius: '100%',

  },

  LinkInnerPages: {
    "text-decoration": 'none',
    color: '#2E3190',

    "&:hover": {
      "text-decoration": 'underline',
      "text-decoration-color": '#F9AE3B'
    }
  },

  loadingLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15% 0',
  },

}));

export default useStyles;
