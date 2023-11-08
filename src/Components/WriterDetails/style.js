import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    Content: {
        display: 'flex',
        flexDirection: 'column',
        width: '874px',
    },
    ImageDiv: {
        margin: '30px 0px',
    },
    newsDetailsImage: {
        width: '173px',
        height: 'auto',
        borderRadius: '50%',
        border: '2px solid #F9AE3B',
        aspectRatio: '1/1',
        objectFit: "fill",

        "@media (max-width: 768px)": {
            height: 'auto',
        },
    },
    Title: {
        fontSize: '35px',
        fontFamily: "GE_SS_Two_M",
        color: '#2E3190',

        "@media (max-width: 768px)": {
            fontSize: '30px',
        },
    },

    writerContent: {
        display: 'flex',
        margin: '5px 0'
    },
    dividerContent: {
        display: 'flex',
    },
    divider: {
        backgroundColor: "#F9AE3B !important",
        width: "13px !important",
        height: "auto !important",
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

    EpisodesList: {
        margin: '25px 0'
    },
    EpisodesUL: {
        listStyle: 'disclosure-closed',
        paddingRight: '18px',
        "@media (max-width: 768px)": {
            paddingRight: '20px',
        },
    },
    EpisodesHeaderTitle: {
        padding: '15px 0',
        fontSize: '23px',
        fontFamily: 'GE_SS_Two_M',
        color: '#2E3190',

        textDecoration: 'underline',
        textDecorationColor: '#F9AE3B',
        textDecorationThickness: '5px',
        textUnderlineOffset: '8px',

    },
    LinkInnerPages: {
        textDecoration: 'none',
        color: '#2E3190',

        '&:hover': {
            textDecoration: 'underline',
        }
    },
    EpisodesTitle: {
        fontFamily: 'GE_SS_Two_L',
        fontSize: '18px',
    }

}));

export default useStyles;
