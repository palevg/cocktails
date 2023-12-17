import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import useFetching from "../hooks/useFetching";
import { Container, Box, Typography, CircularProgress, Select, MenuItem } from "@mui/material";
import "../styles/App.scss";
import NotFound from "../components/NotFound";
import MainList from "../components/MainList";
import { appColor } from '../App';

export default function Home() {
  const { cocktails, setCocktails, countPerPage, symbolToSearch, setSymbolToSearch, searchText, setSearchText } = useContext(DataContext);
  const isSearching = Boolean(symbolToSearch.letter);

  const symbolsRow1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
  const symbolsRow2 = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const symbolsRow3 = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '', ''];

  const checkSearchSymbol = () => {
    if (symbolToSearch.letter !== '') {
      const elements = document.getElementsByTagName('td');
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === symbolToSearch.letter) {
          elements[i].style.color = appColor.grapefruit;
          break;
        }
      }
    }
  }

  const handleSymbolClick = (event, symbol) => {
    if (searchText !== '') setSearchText('');
    if (symbol === symbolToSearch.letter) {
      event.target.style.color = appColor.gray;
      setSymbolToSearch({ letter: '', element: null });
      fetchCocktails(3, '');
    } else {
      const elements = document.getElementsByTagName('td');
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === symbolToSearch.letter) {
          elements[i].style.color = appColor.gray;
          break;
        }
      }
      event.target.style.color = appColor.grapefruit;
      setSymbolToSearch({ letter: symbol, element: event.target });
      fetchCocktails(1, symbol);
    }
  }

  const handleLetterChange = (letter) => {
    if (searchText !== '') setSearchText('');
    if (letter !== symbolToSearch.letter) {
      const elements = document.getElementsByTagName('td');
      let flag = 0;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent === symbolToSearch.letter) {
          elements[i].style.color = appColor.gray;
          if (!letter) break;
          flag++;
        }
        if (elements[i].textContent === letter) {
          elements[i].style.color = appColor.grapefruit;
          setSymbolToSearch({ letter: letter, element: elements[i] });
          flag++;
        }
        if (flag === 2) break;
      }
      if (letter) fetchCocktails(1, letter)
      else {
        setSymbolToSearch({ letter: '', element: null });
        fetchCocktails(3, '');
      }
    }
  }

  const [fetchCocktails, isLoading] = useFetching(async (type, text) => {
    try {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/';
      if (type === 1) url += 'search.php?f=' + text;
      if (type === 2) url += 'search.php?i=' + text;
      if (type === 1 || type === 2) {
        const res = await fetch(url);
        const data = await res.json();
        data.drinks === null
          ? setCocktails([])
          : setCocktails(data.drinks)
      }
      if (type === 3) {
        url += 'random.php';
        let randomCocktails = [];
        for (let i = 0; i < countPerPage; i++) {
          const res = await fetch(url);
          const data = await res.json();
          randomCocktails = [...randomCocktails, ...data.drinks]
        }
        setCocktails(randomCocktails);
      }
    } catch (err) {
      return console.log(err);
    }
  });

  useEffect(() => {
    checkSearchSymbol();
    if (cocktails.length === 0) {
      symbolToSearch.letter === ''
        ? fetchCocktails(3, '')
        : fetchCocktails(1, symbolToSearch.letter)
    }
  }, []);

  return (<Container maxWidth="xl" disableGutters sx={{ p: 1, bgcolor: 'background.default' }}>
    <Box sx={{ display: { xs: 'block', sm: 'flex' }, justifyContent: 'space-between' }}>
      <Box>
        <Typography
          variant="h1"
          color='primary.dark'
          sx={{
            fontFamily: 'Poppins', fontWeight: '600', fontSize: { xs: '22px', sm: '26px', md: '52px' },
            lineHeight: { xs: '42px', md: '80px' }, maxWidth: '680px', mt: { xs: 6, sm: 8 }, ml: 2
          }}
        >A party without cocktails is not like a party</Typography>
        <Typography
          color='text.primary'
          sx={{
            fontFamily: 'Poppins', fontWeight: '500', fontSize: '18px', lineHeight: '28px',
            mt: 4, mb: 4, ml: 2, display: { xs: 'none', sm: 'block' }
          }}
        >Search your favorite cocktail by ABC</Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <table className="table-symbols">
            <tbody>
              <tr>{symbolsRow1.map(symbol =>
                <td key={symbol} onClick={(e) => handleSymbolClick(e, symbol)}>{symbol}</td>)}</tr>
              <tr>{symbolsRow2.map((symbol, index) =>
                <td key={`${index}2${symbol}`} onClick={(e) => handleSymbolClick(e, symbol)}>{symbol}</td>)}</tr>
              <tr>{symbolsRow3.map((symbol, index) =>
                <td key={`${index}3${symbol}`} onClick={(e) => handleSymbolClick(e, symbol)}>{symbol}</td>)}</tr>
            </tbody>
          </table>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{ width: { xs: '100%', sm: 336, md: 501 } }}
        src="./sangria.png"
        alt="Cocktails"
      />
      <Typography
        color='text.primary'
        sx={{
          fontFamily: 'Poppins', fontWeight: '500', fontSize: '14px', lineHeight: '28px',
          mt: 3, mb: 2, ml: 2, display: { xs: 'block', sm: 'none' }
        }}
      >Search your favorite cocktail by ABC</Typography>
      <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', textAlign: 'center' }}>
        <Select
          displayEmpty
          value={symbolToSearch.letter}
          onChange={event => handleLetterChange(event.target.value)}
          size="small"
          sx={{
            width: 80,
            "& .MuiSelect-select": {
              color: 'primary.dark',
              fontWeight: 900,
              border: '1px solid ' + appColor.grapefruit
            },
            "& .MuiSvgIcon-root": {
              color: 'primary.dark'
            }
          }}
          MenuProps={{ sx: { height: "252px" } }}
        >
          <MenuItem value='' size='small'>
            <strong>All</strong>
          </MenuItem>
          {[...symbolsRow1, ...symbolsRow2, ...symbolsRow3.slice(1, 11)].map((symbol) => (
            <MenuItem key={symbol} value={symbol}>
              {symbol}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
    {
      isLoading
        ? <Box sx={{ mt: 10, mb: 10, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h5" color='primary.dark' sx={{ mt: 2, fontFamily: 'Poppins' }}>Loading...</Typography>
        </Box>
        : cocktails.length > 0
          ? <MainList list={cocktails} headerText='' isSearching={isSearching} isCocktail={true} />
          : <NotFound infoText="Sorry, we didn't find any cocktail for you" />
    }
  </Container >)
}