import { React, useState } from "react";

import { db, collection, getDocs, where, query } from "../../Utils/firebase";

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
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";

import { Search as SearchIcon } from "@mui/icons-material";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import MenuIcon from "@mui/icons-material/Menu";

import logo from "../../assests/logo.gif";

import useStyles from "./styles";

const Header = () => {
  const menuItems = [
    { name: "كل الأخبار", to: "/" },
    { name: "محلي", to: "/newstype" },
    { name: "صحافة", to: "/newstype" },
    { name: "دولي", to: "/newstype" },
    { name: "برامج المنصة", to: "/programs" },
    { name: "بودكاست", to: "/podcasts" },
    { name: "رصد مباشر", to: "/rasd" },
  ];

  const currentDate = new Date().toLocaleDateString("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchResultClick = () => {
    setOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchInputChange = (event) => {
    const inputQuery = event.target.value;
    setSearchQuery(inputQuery);

    if (inputQuery.trim().length > 0) {
      searchFunction(inputQuery);
    } else {
      setSearchResults([]);
    }
  };

  const searchFunction = async (text) => {
    try {
      const q = text.toLowerCase();

      const newsQuery = query(
        collection(db, "News"),
        where("Title", ">=", q),
        where("Title", "<=", q + "\uf8ff")
      );

      const programQuery = query(
        collection(db, "ProgramsEpisodes"),
        where("Title", ">=", q),
        where("Title", "<=", q + "\uf8ff")
      );

      const articleQuery = query(
        collection(db, "Articles"),
        where("Text", ">=", q),
        where("Text", "<=", q + "\uf8ff")
      );

      // Execute the query and get the results
      const newsSnapshot = await getDocs(newsQuery);
      const newsResults = newsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "news",
      }));

      const programSnapshot = await getDocs(programQuery);
      const programResults = programSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "program",
      }));

      const articleSnapshot = await getDocs(articleQuery);
      const articleResults = articleSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "article",
      }));

      const allResults = [...newsResults, ...articleResults, ...programResults];

      setSearchResults(allResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
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

            {/* Dialog for the search input */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
              <DialogContent>
                <Box className={classes.searchboxbigger} component="div">
                  <IconButton size="large">
                    <SearchIcon className={classes.searchiconbigger} />
                  </IconButton>
                  <InputBase
                    className={classes.inputbasebigger}
                    placeholder="بحث"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </Box>

                {/* Display the search results */}
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
        {/* </Grid> */}
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
