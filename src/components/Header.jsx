import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from "../context/DataContext";
import { appColor } from "../App";
import useFetching from "../hooks/useFetching";
import { styled } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, Typography, Container, Button, Menu, MenuItem,
  Drawer, IconButton, TextField, InputAdornment, Switch, List, ListItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, setCocktails, countPerPage, symbolToSearch, setSymbolToSearch, searchText, setSearchText } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openFavoritesMenu = Boolean(anchorEl);
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [openFavoritesMenuMobile, setOpenFavoritesMenuMobile] = useState(false);

  const StyledMenu = styled(Menu)({
    '& .MuiPaper-root': {
      border: darkMode ? '1px solid ' + appColor.white : '1px solid ' + appColor.grapefruit,
      borderRadius: '4px 4px 0 0'
    },
    '& .MuiList-root': {
      padding: 0
    },
    '& .MuiMenuItem-root': {
      backgroundColor: 'background.default',
      color: 'text.primary',
      height: '48px',
      fontFamily: 'Poppins',
      fontSize: '18px',
      '&:hover': {
        backgroundColor: appColor.grapefruit,
        color: darkMode ? appColor.black : appColor.whitetext
      }
    }
  });

  const handleHomeClick = () => {
    navigate("/");
    setAnchorElNav(false);
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchorElNav(open);
  };

  const handleColorModeChange = (event) => {
    window.localStorage.setItem('cocktDarkMode', event.target.checked);
    setDarkMode(event.target.checked);
  }

  const handleFavoriteClick = (cocktails) => {
    setAnchorEl(null);
    cocktails
      ? navigate("/cocktails")
      : navigate("/ingredients")
  }

  const handleFavoriteMobileClick = (cocktails) => {
    setOpenFavoritesMenuMobile(false);
    cocktails
      ? navigate("/cocktails")
      : navigate("/ingredients")
  }

  const handleSearchingTextChange = (searchingText) => {
    setSearchText(searchingText);
    fetchCocktails(searchingText);
  }

  const [fetchCocktails, isLoading] = useFetching(async (searchingText) => {
    try {
      if (symbolToSearch.letter !== '') {
        symbolToSearch.element.style.color = appColor.gray;
        setSymbolToSearch({ letter: '', element: null });
      }
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/';
      if (searchingText === '') {
        url += 'random.php';
        let randomCocktails = [];
        for (let i = 0; i < countPerPage; i++) {
          const res = await fetch(url);
          const data = await res.json();
          randomCocktails = [...randomCocktails, ...data.drinks]
        }
        setCocktails(randomCocktails);
      } else {
        url += 'search.php?s=' + searchingText;
        const res = await fetch(url);
        const data = await res.json();
        data.drinks === null
          ? setCocktails([])
          : setCocktails(data.drinks)
      }
    } catch (err) {
      return console.log(err);
    }
  });

  const AppLogo = () => (
    <Link className='logo' to="/">
      <img src="./cocktail.png" alt="Logo" />
      <Typography
        sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: { xs: '24px', sm: '28px' } }}
      >COCKTAILS</Typography>
    </Link>
  );

  const AppModeSwitcher = ({ displayXS, displayMD }) => (
    <Box sx={{ display: { xs: displayXS, md: displayMD }, alignItems: 'center' }}>
      <Typography
        sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 400, color: 'text.switchLight' }}
      >Light</Typography>
      <Switch checked={darkMode} onChange={handleColorModeChange} />
      <Typography
        sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 400, color: 'text.switchDark' }}
      >Dark</Typography>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'background.default' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '63px', display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <AppLogo />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '18px', ml: 4, color: 'text.primary' }}
                onClick={() => navigate("/")}
                size="small"
              >Home</Button>
              <Button
                id="favorites-button"
                aria-controls={openFavoritesMenu ? 'favorites-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openFavoritesMenu ? 'true' : undefined}
                sx={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '18px', ml: 4, color: 'text.primary' }}
                onClick={e => setAnchorEl(e.currentTarget)}
                size="small">Favorite</Button>
              <StyledMenu
                id="favorites-menu"
                anchorEl={anchorEl}
                open={openFavoritesMenu}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'favorites-button',
                }}
              >
                <MenuItem onClick={() => handleFavoriteClick(true)}>Favorite cocktails</MenuItem>
                <MenuItem onClick={() => handleFavoriteClick(false)}>Favorite ingredients</MenuItem>
              </StyledMenu>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="search"
              size="small"
              sx={{ display: { xs: 'none', sm: 'block' }, width: { sm: 180, md: 160, lg: 280 } }}
              placeholder="Search"
              value={searchText}
              onChange={(event) => { handleSearchingTextChange(event.target.value) }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.dark' }} />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between' }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={anchorElNav}
                onClose={toggleDrawer(false)}
              >
                <Box sx={{ bgcolor: 'background.default', height: '100vh' }}>
                  <Box sx={{ pl: 2, pr: 2, height: '69px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
                      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <AppLogo />
                      </Box>
                      <AppModeSwitcher displayXS={'flex'} displayMD={'none'} />
                    </Box>
                    <IconButton
                      aria-label="close"
                      sx={{ color: 'text.primary' }}
                      onClick={toggleDrawer(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Box sx={{ pl: 2, pr: 2 }}>
                      <TextField
                        type="search"
                        size="small"
                        fullWidth
                        sx={{ display: { xs: 'block', sm: 'none' }, mt: 4 }}
                        placeholder="Search"
                        value={searchText}
                        onChange={(event) => { handleSearchingTextChange(event.target.value) }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ color: 'primary.dark' }} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <List sx={{ width: 'fit-content', m: { xs: '0', sm: '0 auto' }, display: { xs: 'block', md: 'none' } }}>
                        <ListItem
                          onClick={handleHomeClick}
                          disablePadding
                          sx={{ fontFamily: 'Poppins', fontSize: '28px', mt: 4 }}
                        >Home</ListItem>
                        <ListItem
                          onClick={() => setOpenFavoritesMenuMobile(!openFavoritesMenuMobile)}
                          disablePadding
                          sx={{ fontFamily: 'Poppins', fontSize: '28px', mt: 4 }}
                        >Favorite{openFavoritesMenuMobile ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </ListItem>
                        <Box
                          onClick={() => setAnchorElNav(false)}
                          sx={{ display: openFavoritesMenuMobile ? 'block' : 'none', position: 'absolute', mt: 2, width: 'max-content' }}>
                          <ListItem
                            onClick={() => handleFavoriteMobileClick(true)}
                            sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                          >Favorite cocktails</ListItem>
                          <ListItem
                            onClick={() => handleFavoriteMobileClick(false)}
                            sx={{ fontFamily: 'Poppins', fontSize: '24px' }}
                          >Favorite ingredients</ListItem>
                        </Box>
                      </List>
                    </Box>
                    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', height: '110px', bgcolor: 'primary.dark' }}></Box>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          </Box>
          <AppModeSwitcher displayXS={'none'} displayMD={'flex'} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}