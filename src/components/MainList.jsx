import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Typography, Pagination } from "@mui/material";
import CocktailCard from "./CocktailCard";
import IngredientCard from "./IngredientCard";

export default function MainList({ list, headerText, isSearching, isCocktail }) {
  const { countPerPage } = useContext(DataContext);
  const [countPages, setCountPages] = useState(1);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);

  const getCards = (page) => {
    const first = (page - 1) * countPerPage;
    const last = (page - 1) * countPerPage + countPerPage;
    const newList = list.filter((item, index) => {
      if (index >= first && index < last) return item;
    });
    setCards(newList);
  }

  const handlePageChange = (event, value) => {
    setPage(value);
    getCards(value);
  }

  useEffect(() => {
    const pages = Math.ceil(list.length / countPerPage);
    setCountPages(pages);
    if (page > pages) {
      setPage(pages);
      getCards(pages);
    } else getCards(page);
  }, [countPerPage, list.length]);

  return <Box sx={{ mb: 4 }}>
    <Typography
      variant="h2"
      color='text.primary'
      sx={{
        fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '22px', sm: '32px', md: '48px' },
        mt: 6, mb: 4, textAlign: 'center'
      }}
    >
      {headerText !== ''
        ? headerText
        : isSearching
          ? "Searching results"
          : "Cocktails"}
    </Typography>
    <Box sx={{ display: countPages > 1 ? 'flex' : 'none', justifyContent: 'center', mb: 3 }}>
      <Pagination count={countPages} page={page} onChange={handlePageChange} color="primary" />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
      {cards.map(listItem => isCocktail
        ? <CocktailCard key={listItem.idDrink} cocktail={listItem} />
        : <IngredientCard key={listItem.idIngredient} ingredient={listItem} />
      )}
    </Box>
  </Box >
}