import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa";

import useStyles from "./styles";

const ShareButton = ({ socialMedia, url, Hashtags, Title }) => {
  const classes = useStyles();

  const handleShare = () => {
    let link = encodeURI(url);
    let msg = encodeURIComponent(Title);
    let hash = encodeURIComponent(Hashtags);

    switch (socialMedia) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;
      case "twitter":
        url = `https://twitter.com/share?&url=${link}&text=${msg}&hashtags=${hash}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${msg}%20${link}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${link}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  const getIcon = () => {
    switch (socialMedia) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "telegram":
        return <FaTelegram />;
      case "whatsapp":
        return <FaWhatsapp />;
      default:
        return null;
    }
  };

  if (Title) {
    return (
      <button
        className={`${classes.shareButton} ${classes[socialMedia]}`}
        onClick={handleShare}
      >
        {getIcon()}
      </button>
    );
  } else return null;
};

export default ShareButton;
