import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '35vw',
        maxWidth: '874px',
        margin: '60px auto',
        '@media screen and (max-width: 500px)' : {
            width: 'auto',
            padding: "0 15px",
        }
    },
    Title: {
        fontSize: '24px',
        fontFamily: "GE_SS_Two_B",
        paddingBottom: '15px',
    },
    Date: {
        fontFamily: "GE_SS_Two_L",
        fontSize: "15px",
        padding: "5px 0",
    },
    newsDetailsImage: {
        width: '640px',
        height: 'auto',

        "@media (max-width: 768px)": {
            width: '330px',
            height: 'auto',
            textAlign: 'center',
        },
    },
    Description: {
        fontSize: '20px',
        fontFamily: "GE_SS_Two_L",
        paddingTop: '10px',
    },
}));

export default useStyles;
