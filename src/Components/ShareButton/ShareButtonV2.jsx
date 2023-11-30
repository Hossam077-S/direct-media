import React from "react";
import {
  FacebookShareButton,
  // TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import useStyles from "./styles";

const ShareButtonV2 = ({ socialMedia, url, Hashtags, Title }) => {
  const classes = useStyles();

  const renderShareButton = () => {
    const commonProps = {
      url,
      className: `${classes.shareButton} ${classes[socialMedia]}`,
    };

    switch (socialMedia) {
      case "facebook":
        return (
          <FacebookShareButton {...commonProps}>
            <FaFacebook className={classes.shareButton} />
          </FacebookShareButton>
        );
      case "twitter":
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          Title
        )}&url=${encodeURIComponent(url)}&hashtags=${Hashtags}`;
        return (
          // <TwitterShareButton
          //   {...commonProps}
          //   title={Title}
          //   hashtags={Hashtags.split(",")}
          // >
          //   <FaXTwitter className={classes.shareButton} />
          // </TwitterShareButton>
          <a
            href={twitterShareUrl}
            className={`${classes.shareButton} ${classes.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className={classes.shareIcon} />
          </a>
        );
      case "whatsapp":
        return (
          <WhatsappShareButton {...commonProps} title={Title}>
            <FaWhatsapp className={classes.shareButton} />
          </WhatsappShareButton>
        );
      case "telegram":
        return (
          <TelegramShareButton {...commonProps}>
            <FaTelegram className={classes.shareButton} />
          </TelegramShareButton>
        );
      default:
        return null;
    }
  };

  if (Title) {
    return renderShareButton();
  } else return null;
};

export default ShareButtonV2;
