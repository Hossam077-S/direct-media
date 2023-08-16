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
    url: "/newsPage/كل الأخبار",
  },
  {
    title: "برامج المنصة",
    url: "/programs",
  },
  {
    title: "بودكاست",
    url: "/podcasts",
  },
  {
    title: "رياضة",
    url: "/newsPage/رياضة",
  },
  {
    title: "الطقس",
    url: "/newsPage/الطقس",
  },
  {
    title: "صحف عالمية",
    url: "/newsPage/صحف عالمية",
  },
  {
    title: "مقترحاتكم",
    url: "/suggestions",
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
              className={classes.rightsTextArabic}
            >
              جميع الحقوق محفوظة لموقع الإعلام المباشر
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.rightsTextEng}
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
                <IconButton className={classes.fButton} size="large">
                  <BsFacebook className={classes.fIcon} />
                </IconButton>

                <IconButton className={classes.IButton} size="large">
                  <FaInstagram className={classes.IIcon} />
                </IconButton>

                <IconButton className={classes.TWButton} size="large">
                  <AiFillTwitterCircle className={classes.TWIcon} />
                </IconButton>

                <IconButton className={classes.TButton} size="large">
                  <FaTiktok className={classes.TIcon} />
                </IconButton>
                <IconButton className={classes.YButton} size="large">
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
