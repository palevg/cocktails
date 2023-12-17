import { useContext } from "react";
import { Container } from "@mui/material";
import { DataContext } from "../context/DataContext";
import MainList from "../components/MainList";
import NotFound from "../components/NotFound";

export default function FavoriteCocktails() {
  const { favorCocktails } = useContext(DataContext);

  return <Container maxWidth="xl" disableGutters sx={{ p: 1, bgcolor: 'background.default' }}>
    {favorCocktails.length > 0
      ? <MainList list={favorCocktails} headerText='Favorite cocktails' isSearching={false} isCocktail={true} />
      : <NotFound infoText="Your list of favorite cocktails is empty!" />}
  </Container>
}