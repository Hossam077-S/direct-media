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
  TextField,
  ThemeProvider,
  createTheme,
  Button,
  ListItem,
  List,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link, NavLink } from "react-router-dom";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

import { Search as SearchIcon } from "@mui/icons-material";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import FirestoreContext from "../../Utils/FirestoreContext2";

import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assests/logo.gif";

import useStyles from "./styles";

const Header = () => {
  const { handleSearch } = useContext(FirestoreContext);
  const menuItems = [
    {
      name: "الأخبار",
      subItems: [
        { name: "كل الأخبار", to: "/newsPage/كل الأخبار" },
        { name: "عاجل", to: "/newsPage/عاجل" },
        { name: "محلي", to: "/newsPage/محلي" },
        { name: "دولي", to: "/newsPage/دولي" },
        { name: "عالمية", to: "/newsPage/عالمية" },
        { name: "صحافة", to: "/newsPage/صحافة" },
        { name: "تقرير", to: "/newsPage/تقرير" },
        { name: "منوعات", to: "/newsPage/منوعات" },
      ],
    },
    { name: "الكتاب", to: "/writers" },
    { name: "برامج المنصة", to: "/programs" },
    { name: "بودكاست", to: "/podcasts" },
  ];

  const currentDate = new Date().toLocaleDateString("ar-EG", {
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
      fontFamily: "AL_Jaz_Regular",
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
  const [categoryEl, setCategoryEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryOpen = (event) => {
    setCategoryEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryEl(null);
  };

  const handleSearchClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSearchResultClick = () => {
    setOpen(false);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowNoResults(false);
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
                    "https://www.youtube.com/@DirectMediaLB?si=wrninKj8iqrNt2bl"
                  )
                }
              >
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
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <TextField
                        label="بحث"
                        name="SearchNews"
                        type="text"
                        variant="outlined"
                        className={classes.textFieldSelect}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleSearch(
                            searchQuery,
                            setSearchResults,
                            setShowNoResults
                          )
                        }
                        className={classes.searchButton}
                      >
                        بحث
                      </Button>
                      {/* Conditional rendering based on searchResults */}
                      {showNoResults ? (
                        <Typography variant="body1">
                          ليس هناك نتائج لبحث: {searchQuery}
                        </Typography>
                      ) : (
                        <List>
                          {/* Your list of search results */}
                          {searchResults.map((news) => (
                            <ListItem key={news.id} dense button>
                              <ListItemText
                                primary={
                                  <Link
                                    onClick={handleSearchResultClick}
                                    to={`news/${news.id}`}
                                    className={classes.searchResultItem}
                                  >
                                    {news.Title}
                                  </Link>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </ThemeProvider>
                  </CacheProvider>
                </Box>
              </DialogContent>
            </Dialog>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu */}
      <Container className={classes.widthContainer}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item className={classes.menuContainer}>
            <NavLink to="/">
              <img src={logo} alt="Logo" className={classes.logoHeader} />
            </NavLink>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <Hidden mdDown>
              <div className={classes.menuItemsContainer}>
                {menuItems.map((item, index) =>
                  item.subItems ? (
                    <div key={index}>
                      <div
                        className={classes.linkMenu}
                        onMouseEnter={handleCategoryOpen}
                        onClick={handleCategoryOpen}
                      >
                        {item.name}
                        <ExpandMoreIcon className={classes.expandMoreIcon} />
                      </div>
                      <Menu
                        anchorEl={categoryEl}
                        open={Boolean(categoryEl)}
                        onClose={handleCategoryClose}
                        MenuListProps={{
                          onMouseLeave: handleCategoryClose,
                        }}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <MenuItem key={subIndex}>
                            <NavLink
                              className={classes.linkMenu}
                              to={subItem.to}
                            >
                              {subItem.name}
                            </NavLink>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  ) : (
                    <NavLink
                      key={index}
                      className={classes.linkMenu}
                      to={item.to}
                    >
                      {item.name}
                    </NavLink>
                  )
                )}
              </div>
            </Hidden>
            <Hidden mdUp>
              <IconButton
                onClick={handleMenuOpen}
                size="large"
                className={classes.menuIcon}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item, index) =>
                item.subItems ? (
                  <div key={index}>
                    <MenuItem onClick={handleCategoryOpen}>
                      <span className={classes.linkMenu}>{item.name}</span>
                    </MenuItem>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        disablePadding
                        className={classes.ListContainer}
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <MenuItem key={subIndex} onClick={handleMenuClose}>
                            <NavLink
                              className={classes.linkMenuMobile}
                              to={subItem.to}
                            >
                              {subItem.name}
                            </NavLink>
                          </MenuItem>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                ) : (
                  <MenuItem key={index} onClick={handleMenuClose}>
                    <NavLink className={classes.linkMenu} to={item.to}>
                      {item.name}
                    </NavLink>
                  </MenuItem>
                )
              )}
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
