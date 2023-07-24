import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";

import useStyles from "./styles";
import { Link } from "react-router-dom";

import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import logo from "../../assests/WhiteLogo.gif";

const menuItems = [
  {
    title: "كل الأخبار",
    url: "/news",
  },
  {
    title: "برامج المنصة",
    url: "/platform-programs",
  },
  {
    title: "بودكاست",
    url: "/podcasts",
  },
  {
    title: "رصد مباشر",
    url: "/live-monitoring",
  },
  {
    title: "الطقس",
    url: "/weather",
  },
  {
    title: "صحف عالمية",
    url: "/international-newspapers",
  },
  {
    title: "مقترحاتكم",
    url: "/user-suggestions",
  },
];

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.containerFooter}>
      <>
        <Divider
          orientation="horizontal"
          flexItem
          className={classes.DividerHeader}
        />
      </>
      <div className={classes.divFooter}>
        <div className={classes.menuDetails}>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.menuDivider}
          />
          <div className={classes.menuContent}>
            <Typography gutterBottom className={classes.menuTitle}>
              إكتشف الإعلام المباشر
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.menuDescription}
            >
              {menuItems.map((menuItem, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className={classes.menuSeparator}>|</span>
                  )}
                  <Link to={menuItem.url} className={classes.menuLink}>
                    {menuItem.title}
                  </Link>
                </React.Fragment>
              ))}
            </Typography>
          </div>
        </div>
        <div className={classes.botFooter}>
          <div className={classes.rightsDiv}>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.rightsText}
            >
              جميع الحقوق محفوظة لموقع الإعلام المباشر
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.rightsText}
            >
              All Rights Reserved for Direct Media Website{" "}
            </Typography>
          </div>
          <div className={classes.logoContentDiv}>
            <div className={classes.logoDiv}>
              <img src={logo} alt="Logo" width="157px" height="35.4px" />
            </div>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.logoContentDivider}
            />
            <div className={classes.socialMediaDiv}>
              {" "}
              <Box className={classes.socialmediaiconbox}>
                <IconButton className={classes.fButton}>
                  <BsFacebook className={classes.fIcon} />
                </IconButton>

                <IconButton className={classes.IButton}>
                  <FaInstagram className={classes.IIcon} />
                </IconButton>

                <IconButton className={classes.TWButton}>
                  <AiFillTwitterCircle className={classes.TWIcon} />
                </IconButton>

                <IconButton className={classes.TButton}>
                  <FaTiktok className={classes.TIcon} />
                </IconButton>
                <IconButton className={classes.YButton}>
                  <BsYoutube className={classes.YIcon} />
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
