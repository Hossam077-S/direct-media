import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import useStyles from "./styles";

const ShareButton = ({ socialMedia, url }) => {
  const classes = useStyles();
  const handleShare = () => {
    let url = "";

    switch (socialMedia) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/${encodeURIComponent(url)}`;
        break;
      case "twitter":
        url = `https://twitter.com/i/flow/login?redirect_after_login=${encodeURIComponent(
          url
        )}`;
        break;
      case "youtube":
        url = `https:=${encodeURIComponent(url)}`;
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
      case "instagram":
        return <FaInstagram />;
      case "twitter":
        return <FaTwitter />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`${classes.shareButton} ${classes[socialMedia]}`}
      onClick={handleShare}
    >
      {getIcon()}
    </button>
  );
};

export default ShareButton;
