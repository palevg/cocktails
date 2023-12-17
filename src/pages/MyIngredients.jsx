import { useContext } from "react";
import { Container } from "@mui/material";
import { DataContext } from "../context/DataContext";
import MainList from "../components/MainList";
import NotFound from "../components/NotFound";

export default function FavoriteIngredients() {
  const { favorIngredients } = useContext(DataContext);

  return <Container maxWidth="xl" disableGutters sx={{ p: 1, bgcolor: 'background.default' }}>
    {favorIngredients.length > 0
      ? <MainList list={favorIngredients} headerText='Favorite ingredients' isSearching={false} isCocktail={false} />
      : <NotFound infoText="Your list of favorite ingredients is empty!" />}
  </Container>
}