import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    podcastContainer: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        maxWidth: '874px',
        margin: '5vw auto',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    imageContainer: {
        marginBottom: '2VW',
    },
    imageLogo: {
        width: 'auto',
    },
    descriptionContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
    },
    SliderDivider: {
        backgroundColor: "#F9AE3B",
        width: "13px",
      },
    description: {
        paddingRight: '1vw',
        fontSize: '18px',
        fontFamily: 'GE_SS_Two_L !important',
        color: '#2E3190',
    },
    podcastItemContainer: {
        margin: '3vw 0'
    },
    podcastMediaItems: {

    },
    podcastContent: {

    },
    podcastImageCover: {
        width: '252px',
        height: 'auto',
    },
}));

export default useStyles;
