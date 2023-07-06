import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    width: "874px !important", 
    padding: "0px !important", 
    marginTop: "23px !important",
  },
  slicerDiv: {
    height: "43px",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "#2E3190",
  },
  newsDiv: {
    flexGrow: 1,
    transition: "all ease-in-out 2s !important",
  },
  arrowDiv: {
    display: 'flex',
    justifyContent:'center',
    paddingLeft: '10px'
  },
  upButton: {
    marginRight: '2px !important',
    padding: '0px !important',
  },
  downButton: {
    padding: '0px !important',
  },
  typoTitle: {
    textAlign: "right",
    marginRight: "15px !important",
    fontFamily: "GE_SS_Two_M !important",
    fontSize: "17.33",
  },
  imageDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageTitle: {
    position: "absolute",
    top: "50%",
    left: "54%",
    transform: "translate(-50%, -50%)",
    textAlign: "right",
    color: "white",
    fontFamily: "GE_SS_Two_M !important",
    fontSize: "17.33px !important",
  },
  gridSlidersContainer: {
    marginTop: '38px'
  },
  youtubeVideo: {
    width: '205px',
    height: '364px',
    "& iframe": {
      width: "100%",
      height: '100%',
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
  },
  newsImageDiv: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',

    "& .slick-next": {
      position: 'relative',
      top: '20px',
      left: '213px',
      backgroundColor: '#DCDCDC !important',
      padding: '1px',
    },
    "& .slick-prev": {
      position: 'relative',
      top: "100%",
      left: "82%",
      backgroundColor: '#DCDCDC !important',
      padding: '1px',
    },
  },
  arrowRight: {
    position: "absolute !important",
    top: "50% !important", 
    right: "4% !important",
    opacity: "0.4",
    zIndex: 1,
  },
  arrowLeft: {
    position: "absolute !important",
    top: "50% !important", 
    left: "4% !important",
    opacity: "0.4",
    zIndex: 1,
  },
  newsImage: {
    animation: "$slideInImage 1.2s ease-in-out",
  },
  sliderItem: {  
    display: 'flex',
    flexDirection: 'column',
  },
  sliderContent: {
    marginTop: 'auto',
  },
  SliderDivider: {
    position: "absolute !important",
    top: "67.4% !important",
    right: "0 !important",
    backgroundColor: "#F9AE3B !important",
    width: "13px !important",
    height: "136px !important",
  },
  sliderNewsTitle : {
    position: "absolute !important",
    top: "70% !important",
    right: "6% !important",

    color: 'white',
    fontFamily: 'GE_SS_Two_B !important',
    fontSize: '22px !important',

    textAlign: 'right',
    lineHeight: '1.2 !important',
    
    animation: "$slideInTitle 2s ease-in-out",
  },
  sliderNewsDescription: {
    position: "absolute !important",
    top: "82% !important",
    right: "6% !important",
    paddingLeft: '6% !important',

    color: 'white',
    
    fontFamily: 'GE_SS_Two_L !important',
    fontSize: '19.48px !important',

    animation: "$slideInDescription 2s ease-in-out",

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.5",
    textAlign: "justify",
    direction: "rtl",
    
  },
  "@keyframes slideInImage": {
    "0%": {
      opacity: 0,
      transform: "translateX(30px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },

  "@keyframes slideInTitle": {
    "0%": {
      opacity: 0,
      transform: "translateX(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "@keyframes slideInDescription": {
    "0%": {
      opacity: 0,
      transform: "translateX(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
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
    marginTop: '38px',
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
    right: "45.4%",
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
    backgroundColor: '#E9E9E9',
  },
  programImage: {
    width: "170px !important",
    height: "94.2px !important",
    paddingLeft: '6px !important'
  },
  newsTypesHeader: {
    display: 'flex',
    marginTop: '42px',
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    marginRight: '89px',
  },
  globalHeaderDiv: {
    display: 'flex',
    position: 'relative',
    width: '233px',
  },
  globalDivider: {
    backgroundColor: "#F9AE3B !important",
    width: '164px',
    height: "5px !important",
  },
  globalDivider2: {
    backgroundColor: "#F9AE3B !important",
    width: '149px',
    height: "5px !important",
  },
  globalText: {
    position: 'absolute',
    top: '-17px',
    right: 0,
    color: '#2E3190',
    fontSize: '23px !important',
    fontFamily: 'GE_SS_Two_M !important',
  },
  newsTypeSlider: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '37px',

    "& .slick-list": {
      width: '228px'
    },

    "& .slick-next": {
      position: 'relative',
      top: '20px',
      left: '213px',
      backgroundColor: '#DCDCDC !important',
      padding: '1px',
    },
    "& .slick-prev": {
      position: 'relative',
      top: "100%",
      left: "82%",
      backgroundColor: '#DCDCDC !important',
      padding: '1px',
    },
  },
  newsTypeSliderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'right',
    paddingBottom: "3.4px",
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
    textAlign: 'end',
  },
  newsTypeSliderDate: {
    paddingRight: '10px',
    marginTop: '10px',
    textAlign: 'end',
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
    height: '720px'
  },
  container2: {
    padding: "0px !important", 
    width: "874px !important", 
  },
  articlStack: {
    backgroundColor: '#2E3190',
    height: '609px',
    width: '315px',
  },
  articlDivTitle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '10px'
  },
  articlTitleHeader: {
    fontSize: '32.9px !important',
    fontFamily: "GE_SS_Two_M !important",
    color: '#FFFFFF',
    textAlign: 'center',
  },
  articlTitleParg: {
    fontSize: '22.2px !important',
    fontFamily: "GE_SS_Two_L !important",
    color: '#FFFFFF',
    textAlign: 'center',
  },
  articlContentDiv: {
    display: 'flex',
  },
  articlImage_Divider: {
    display: 'flex',
  },
  newsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '315px',
    height: '125px',
  },
  newsListItem: {
    padding: theme.spacing(2.4, 0),
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    paddingLeft: '12px',
  },
  newsAvatar: {
    width: '84.8px',
    height: '84.8px',
  },
  activeListItem: {
    backgroundColor: '#1B1464',
    width: '315px',
    height: '125px',
    padding: '0',
  },
  newsItemContent: {
    display: 'flex',
    alignItems: 'center',
  },
  descriptionContent: {
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'column',
    width: '186px',
    paddingRight: '12px',
  },
  newsItemTitle: {
    marginLeft: '21px !important',
    color: 'white',
    fontSize: '12px !important',
    fontFamily: 'GE_SS_Two_B !important',
  },
  newsItemDescription: {
    marginLeft: '21px !important',
    color: 'white',
    fontSize: '8.4px !important',
    fontFamily: 'GE_SS_Two_L !important',
  },
  articlDivider: {
    backgroundColor: '#000000',
    marginRight: '18px',
    opacity: 0,
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
    position: 'relative !important',
    width: '527px',
    height: '319px',
  },
  title_dividerArticl: {
    position: "absolute !important",
    top: "75% !important",
    right: "0 !important",
    backgroundColor: '#2E3190 !important',
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    zIndex: 1,
  },
  articlSliderDivider: {
    backgroundColor: "#F9AE3B !important",
    width: "14px !important",
    height: "80px !important",
  },
  sliderArticlTitle: {
    paddingRight: '22px',
    paddingTop: '20px',
    color: 'white',
    fontFamily: 'GE_SS_Two_M !important',
    fontSize: '15px !important',
    animation: "$slideInTitle 2s ease-in-out",
  },
  threeNewsContainer: {
    display: 'flex',
    marginTop: '32px',
  },
  newsThreeSlider: {
    display: 'flex',
  },
  threeSlidersContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ThreeSlider: {
    position: 'relative',
    width: '160px',
    height: '258px',
    marginRight: '23px',
    backgroundColor: 'white',
  },
  title_description_threeSlider: {
    height: '137px',
    paddingRight: '15px',
    paddingLeft: '19px',
    paddingTop: '14px',
  },
  sliderThreeTitle: {
    fontSize: '10px !important',
    fontFamily: 'GE_SS_Two_M !important',
    textAlign: 'right',

  },
  sliderThreeDescription: {
    fontSize: '8px !important',
    fontFamily: 'GE_SS_Two_L !important',
    textAlign: 'right',
  },
  arrowThreeRight: {
    position: "absolute !important",
    top: "100% !important", 
    right: "0% !important",
    zIndex: 1,
    padding: '0px !important',
    marginTop: '4px !important',
  },
  arrowThreeLeft: {
    position: "absolute !important",
    top: "100% !important", 
    right: "12% !important",
    zIndex: 1,
    padding: '0px !important',
    marginTop: '4px !important',
  },
  containerDiv3: {
    height: '89px',
    width: '1000px !important',
    backgroundColor: '#F0F0F0',
  },
  videoImageDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerDiv4: {
    display: 'flex !important',
    justifyContent: 'center',
    marginTop: '74px',
  },
  writerContainer: {
    width: '874px !important',
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
    right: "45.4%",
    paddingLeft: '7px',
    paddingRight: '7px',
    color: '#2E3190',
    fontSize: "23px !important",
    fontFamily: "GE_SS_Two_M !important",
  },
  writerDetails: {
    marginTop: '32px',
  },
  writerSlider: {
    width: '100%',
  },
  writerItems: {
    marginTop: '27px',
    width: '942px'
  },
  writerImage: {
    width: "166px !important",
    height: "166px !important",
  },
  writerTitle: {
    paddingTop: '12px',
    color: '#2E3190',
    fontSize: "17.3px !important",
    fontFamily: "GE_SS_Two_L !important",
  },
  containerDiv5: {
    marginTop: '50px',
  },
  podcastDiv: {
    display: 'flex',
    justifyContent: 'center',
    height: '193.3px',
  },
  containerDiv6: {
    marginTop: '53px',
    display: 'flex !important',
    justifyContent: 'center',
  },
  podcastContainer: {
    width: '874px !important',
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
    right: "45.4%",
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
    width: '946px',
  },
  podcastMediaImage: {
    width: "242px !important",
    height: "242px !important",
    
  },
  
}));

export default useStyles;
