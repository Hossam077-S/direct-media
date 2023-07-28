import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,

        maxWidth: '874px',
        margin: '60px auto',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    Title: {
        fontSize: '38px',
        fontFamily: "GE_SS_Two_B",
        paddingBottom: '25px',
    },
    Date: {
        fontFamily: "GE_SS_Two_L",
        fontSize: "15px",
        padding: "5px 0",
    },
    newsDetailsImage: {
        width: '100%',
        height: 'auto',

        "@media (max-width: 768px)": {
            width: '90vw',
            height: 'auto',
            textAlign: 'center',
        },
    },
    Description: {
        fontSize: '28px',
        fontFamily: "GE_SS_Two_L",
        paddingTop: '10px',
    },
}));

export default useStyles;
