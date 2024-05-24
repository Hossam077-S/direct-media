import React from "react";
import useStyles from "./styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function WhatsApp() {
  const classes = useStyles();

  const handleClick = () => {
    window.open(
      "https://whatsapp.com/channel/0029VaDW9HXBfxo4mQgXxJ3y",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={classes.whatsContainer}>
      <div className={classes.whatsIconContainer}>
        <div className={classes.whatsIconContent}>
          <WhatsAppIcon className={classes.whatsIcon} />
        </div>
      </div>
      <div className={classes.whatsContent}>
        <h1 className={classes.Title}>
          تابعوا آخر الأخبار على قناة منصة الإعلام المباشر على
        </h1>
        <h2 className={classes.whatsTitle}>WHATSAPP</h2>
        <button className={classes.JoinNowButton} onClick={handleClick}>
          Join Now
        </button>
        <p className={classes.whatsJoinTitle}>DirectMedia@</p>
      </div>
    </div>
  );
}

export default WhatsApp;
