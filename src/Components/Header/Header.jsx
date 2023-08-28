import { React, useState, useContext } from "react";

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
  Dialog,
  DialogContent,
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { Search as SearchIcon } from "@mui/icons-material";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assests/logo.gif";

import useStyles from "./styles";

import FirestoreContext from "../../Utils/FirestoreContext";

const Header = () => {
  const { searchNews } = useContext(FirestoreContext);

  const menuItems = [
    { name: "كل الأخبار", to: "/newsPage/كل الأخبار" },
    { name: "محلي", to: "/newsPage/محلي" },
    { name: "صحافة", to: "/newsPage/صحافة" },
    { name: "دولي", to: "/newsPage/دولي" },
    { name: "الكتاب", to: "/writers" },
    { name: "برامج المنصة", to: "/programs" },
    { name: "بودكاست", to: "/podcasts" },
  ];

  const currentDate = new Date().toLocaleDateString("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
    textAlign: "center",
    palette: {
      primary: {
        main: "#2E3190",
      },
      common: {
        white: "#ffffff",
      },
      background: {
        paper: "#ffffff",
      },
      grey: {
        300: "#e0e0e0",
      },
    },
    typography: {
      fontFamily: "GE_SS_TWO_L",
      fontSize: 14,
      fontWeightBold: 700,
    },
    spacing: 8, // Define your custom spacing unit here
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchResults([]);
  };

  const handleSearchResultClick = () => {
    setOpen(false);
    setSearchResults([]);
  };

  const handleSearchInputChange = (_, newValue) => {
    if (newValue) {
      window.location.href = `/news/${newValue.id}`;
    }
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
              <IconButton className={classes.fButton} size="large">
                <BsFacebook className={classes.fIcon} />
              </IconButton>
              <IconButton className={classes.IButton} size="large">
                <FaInstagram className={classes.IIcon} />
              </IconButton>
              <IconButton size="large">
                <AiFillTwitterCircle className={classes.TWIcon} />
              </IconButton>
              <IconButton className={classes.TButton} size="large">
                <FaTiktok className={classes.TIcon} />
              </IconButton>
              <IconButton className={classes.YButton} size="large">
                <BsYoutube className={classes.YIcon} />
              </IconButton>
            </Box>

            {/* Left Header / Search */}
            <Box className={classes.leftheader}>
              <Box className={classes.searchbox} component="div">
                {/* Search Icon */}
                <IconButton size="large">
                  <SearchIcon className={classes.searchicon} />
                </IconButton>
                <InputBase
                  className={classes.inputbase}
                  placeholder="بحث"
                  onClick={handleSearchClick}
                />
              </Box>
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
              <DialogContent>
                <Box className={classes.searchboxbigger} component="div">
                  {/* <IconButton size="large">
                    <SearchIcon className={classes.searchiconbigger} />
                  </IconButton> */}
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <Autocomplete
                        className={classes.inputbasebigger}
                        options={searchNews}
                        getOptionLabel={(news) => news.Title}
                        onChange={handleSearchInputChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="RelatedNews"
                            label="بحث"
                            variant="outlined"
                            className={classes.textFieldSelect}
                          />
                        )}
                      />
                    </ThemeProvider>
                  </CacheProvider>
                </Box>
                <Box className={classes.searchResults}>
                  {searchResults.map((result, index) => (
                    <div key={index} className={classes.searchResultItem}>
                      <Link
                        to={`/${result.type}/${result.id}`}
                        onClick={handleSearchResultClick}
                        className={classes.searchResultLink}
                      >
                        {result.type === "news" && (
                          <div>
                            <span>خبر: </span>
                            <span>{result.Title}</span>
                          </div>
                        )}
                        {result.type === "article" && (
                          <div>
                            <span>مقال: </span>
                            <span>{result.Text}</span>
                          </div>
                        )}
                        {result.type === "program" && (
                          <div>
                            <span>برنامج: </span>
                            <span>{result.Title}</span>
                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
                </Box>
              </DialogContent>
            </Dialog>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu */}
      <Container className={classes.widthContainer}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item className={classes.gridMenu}>
            <NavLink to="/">
              <img src={logo} alt="Logo" className={classes.logoHeader} />
            </NavLink>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <Hidden lgDown>
              {menuItems.map((item, index) => (
                <NavLink key={index} className={classes.linkMenu} to={item.to}>
                  {item.name}
                </NavLink>
              ))}
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleMenuOpen} size="large">
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
                  <Link
                    className={classes.linkMenu}
                    to={item.to}
                    color="inherit"
                  >
                    {item.name}
                  </Link>
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
