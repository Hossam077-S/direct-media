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

import { Link } from "react-router-dom";

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

            {/* Left Header / Search */}
            <Box className={classes.leftheader}>
              <Box className={classes.searchbox} component="div">
                {/* Search Icon */}
                <IconButton>
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
                  <IconButton>
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
                        {result.type === "برنامج" && (
                          <div>
                            <span>Program: </span>
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
            <Link to="/">
              <img src={logo} alt="Logo" className={classes.logoHeader} />
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
                  <a className={classes.linkMenu} href={item.href}>
                    {item.name}
                  </a>
                  {/* <NavLink
                    className={classes.linkMenu}
                    to={item.href}
                    color="inherit"
                  >
                    {item.name}
                  </NavLink> */}
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
