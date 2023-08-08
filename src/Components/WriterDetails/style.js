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
    ImageDiv: {
        marginBottom: '30px',   
    },
    Title: {
        fontSize: '40px',
        fontFamily: "GE_SS_Two_M",
        color: '#2E3190',

        "@media (max-width: 768px)": {
            fontSize: '30px',
        },
    },
    newsDetailsImage: {
        width: '173px',
        height: 'auto',

        "@media (max-width: 768px)": {
            width: 'auto',
            height: 'auto',
        },
    },
    writerContent: {
        display: 'flex',
        margin: '30px 0'
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
