import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '874px',
        margin: '60px auto',
        height: '35vw',
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
    EpisodesList: {
        margin: '15px 0'
    },
    EpisodesHeaderTitle: {
        padding: '15px 0',
    },
    LinkInnerPages: {
        textDecoration: 'none',
        color: 'black',

        '&:hover': {
            textDecoration: 'underline',
        }
    },
    EpisodesTitle: {
        fontFamily: '',
        fontSize: '15px'
    }

}));

export default useStyles;
