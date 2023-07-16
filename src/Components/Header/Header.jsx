import { React, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  MenuItem,
  Menu,
  Hidden,
  Divider,
  Grid,
  Container,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";

import { Search as SearchIcon } from "@material-ui/icons";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../assests/logo.gif";

import useStyles from "./styles";

const Header = () => {
  const menuItems = [
    { name: "كل الأخبار", href: "/#latest-news" },
    { name: "محلي", href: "/#news" },
    { name: "صحافة", href: "/#news" },
    { name: "دولي", href: "/#news" },
    { name: "برامج المنصة", href: "/#programs" },
    { name: "بودكاست", href: "/#podcast" },
    { name: "رصد مباشر", href: "/#rasd" },
  ];

  const currentDate = new Date().toLocaleDateString("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.divHeader}>
      <AppBar className={classes.appBar} position="static">
        {/* <Grid> */}
        <Container className={classes.widthContainer}>
          <Toolbar className={classes.toolbar}>
            {/* Date */}
            <Box className={classes.todaydatebox}>
              <Typography className={classes.todaydatetext} variant="body2">
                {currentDate}
              </Typography>
            </Box>

            {/* Social Media Icons */}
            <Box className={classes.socialmediaiconbox}>
              <IconButton className={classes.fButton}>
                <BsFacebook className={classes.fIcon} />
              </IconButton>
              <IconButton className={classes.IButton}>
                <FaInstagram className={classes.IIcon} />
              </IconButton>
              <IconButton>
                <AiFillTwitterCircle className={classes.TWIcon} />
              </IconButton>
              <IconButton className={classes.TButton}>
                <FaTiktok className={classes.TIcon} />
              </IconButton>
              <IconButton className={classes.YButton}>
                <BsYoutube className={classes.YIcon} />
              </IconButton>
            </Box>

            {/* Left Header */}
            <Box className={classes.leftheader}>
              {/* Search Box */}
              <Box className={classes.searchbox} component="div">
                {/* Search Icon */}
                <IconButton>
                  <SearchIcon className={classes.searchicon} />
                </IconButton>
                <InputBase className={classes.inputbase} placeholder="بحث" />
              </Box>
            </Box>
          </Toolbar>
        </Container>
        {/* </Grid> */}
      </AppBar>

      {/* Menu */}
      <Container className={classes.widthContainer}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item className={classes.gridMenu}>
            <Link to="/">
              <img src={logo} alt="Logo" width="225px" height="50px" />
            </Link>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <Hidden mdDown>
              {menuItems.map((item) => (
                <a className={classes.linkMenu} href={item.href}>
                  {item.name}
                </a>
                // <NavLink
                //   key={item.name}
                //   className={classes.linkMenu}
                //   to={item.href}
                //   color="inherit"
                // >
                //   {item.name}
                // </NavLink>
              ))}
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.name} onClick={handleMenuClose}>
                  <NavLink
                    className={classes.linkMenu}
                    to={item.href}
                    color="inherit"
                  >
                    {item.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
