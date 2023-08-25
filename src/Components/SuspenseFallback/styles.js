import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    suspenseDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    
    spinner: {
        width: "72px",
        height: "72px",
        display: "grid",
        border: "5.8px solid #0000",
        borderRadius: "50%",
        borderColor: "#2e3190 #0000",
        animation: "$spinnerAnimation 1s infinite linear",
        position: "relative",
        "&::after, &::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "inherit",
        },
        "&::before": {
          margin: "2.9px",
          borderColor: "#f9ae3b #0000",
          animation: "$spinnerAnimation",
          animationDuration: "0.5s",
          animationDirection: "reverse",
        },
        "&::after": {
          margin: "11.6px",
        },
    },
    "@keyframes spinnerAnimation": {
        "100%": {
          transform: "rotate(1turn)",
        },
    },

    progress: {
        width: "100.8px",
        height: "16.8px",
        background: `
          linear-gradient(#f9ae3b 50%, #0000 0),
          linear-gradient(#0000 50%, #f9ae3b 0),
          linear-gradient(#f9ae3b 50%, #0000 0),
          linear-gradient(#0000 50%, #f9ae3b 0),
          linear-gradient(#f9ae3b 50%, #0000 0),
          linear-gradient(#0000 50%, #f9ae3b 0),
          #2e3190
        `,
        backgroundSize: "calc(100%/6 + 1px) 200%",
        backgroundRepeat: "no-repeat",
        animation: "$progressAnimation 2s infinite",
    },
    "@keyframes progressAnimation": {
        "0%": {
          backgroundPosition:
            "0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%",
        },
        "16.67%": {
          backgroundPosition:
            "0% 0%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 0%",
        },
        "33.33%": {
          backgroundPosition:
            "0% 0%, 20% 100%, 40% 100%, 60% 0%, 80% 100%, 100% 0%",
        },
        "50%": {
          backgroundPosition:
            "0% 0%, 20% 100%, 40% 0%, 60% 0%, 80% 100%, 100% 0%",
        },
        "66.67%": {
          backgroundPosition:
            "0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 100%, 100% 0%",
        },
        "83.33%": {
          backgroundPosition:
            "0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 0%",
        },
        "100%": {
          backgroundPosition:
            "0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%",
        },
    },

    dots: {
        width: "13.4px",
        height: "13.4px",
        borderRadius: "50%",
        background: "#2e3190",
        color: "#2e3190",
        clipPath: "inset(-29.1px)",
        animation: "$dotsAnimation 2s infinite linear",
    },
     "@keyframes dotsAnimation": {
        "0%": {
          boxShadow: "0 0 0 0, 44.8px 0,-44.8px 0,0 44.8px,0 -44.8px",
        },
        "10%": {
          boxShadow: "0 0 0 0, 13.4px 0,-44.8px 0,0 44.8px,0 -44.8px",
        },
        "20%": {
          boxShadow: "0 0 0 4.5px, 0 0,-44.8px 0,0 44.8px,0 -44.8px",
        },
        "30%": {
          boxShadow: "0 0 0 4.5px, 0 0,-13.4px 0,0 44.8px,0 -44.8px",
        },
        "40%": {
          boxShadow: "0 0 0 9px, 0 0, 0 0,0 44.8px,0 -44.8px",
        },
        "50%": {
          boxShadow: "0 0 0 9px, 0 0, 0 0,0 13.4px,0 -44.8px",
        },
        "60%": {
          boxShadow: "0 0 0 13.4px, 0 0, 0 0,0 0,0 -44.8px",
        },
        "70%": {
          boxShadow: "0 0 0 13.4px, 0 0, 0 0,0 0,0 -13.4px",
        },
        "80%": {
          boxShadow: "0 0 0 17.9px, 0 0, 0 0,0 0,0 0",
        },
        "90%, 100%": {
          boxShadow: "0 0 0 0, 44.8px 0,-44.8px 0,0 44.8px,0 -44.8px",
        },
    },
    
}));

export default useStyles;