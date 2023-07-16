import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '874px',
        margin: '15px auto',

        '@media screen and (max-width: 500px)' : {
            maxWidth: 'none',
        }
    }
}));

export default useStyles;
