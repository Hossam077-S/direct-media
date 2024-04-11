import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";

import useStyles from "./styles";
import { Link } from "react-router-dom";

import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
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
    title: "طقس",
    url: "/newsPage/طقس",
  },
  {
    title: "صحافة",
    url: "/newsPage/صحافة",
  },
  {
    title: "تقرير",
    url: "/newsPage/تقرير",
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
            <Link to="/admin" className={classes.menuLink}>
              - تسجيل الدخول
            </Link>
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
                <IconButton
                  className={classes.fButton}
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=61558246953183"
                    )
                  }
                >
                  <BsFacebook className={classes.fIcon} />
                </IconButton>

                <IconButton
                  className={classes.IButton}
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/directmlb/?igshid=OGQ5ZDc2ODk2ZA%3D%3D/"
                    )
                  }
                >
                  <FaInstagram className={classes.IIcon} />
                </IconButton>

                <IconButton
                  className={classes.TWButton}
                  size="large"
                  onClick={() =>
                    window.open("https://twitter.com/directMdLb?s=20")
                  }
                >
                  <FaXTwitter className={classes.TWIcon} />
                </IconButton>

                <IconButton
                  className={classes.TButton}
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://www.tiktok.com/@directmedialeb?_t=8gwxHijGGwh&_r=1"
                    )
                  }
                >
                  <FaTiktok className={classes.TIcon} />
                </IconButton>
                <IconButton
                  className={classes.YButton}
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://youtube.com/@directmedialb6728?si=W_PJ_wCQqcE0gjSD"
                    )
                  }
                >
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
