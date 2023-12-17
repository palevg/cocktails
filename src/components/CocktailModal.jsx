import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import useFetching from "../hooks/useFetching";
import { handleClickFavorite } from './CocktailCard';
import { Dialog, Card, IconButton, Box, CardMedia, Typography, CardActions, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IngredientModal from "./IngredientModal";
import { toast } from "react-toastify";

export default function CocktailModal({ openDialog, setOpenDialog, cocktail, isFavorite }) {
  const { darkMode, favorCocktails, setFavorCocktails, favorIngredients } = useContext(DataContext);
  const [ingredient, setIngredient] = useState({});
  const isFavoriteIngred = Boolean(favorIngredients.filter(favItem => favItem.idIngredient === ingredient.idIngredient).length > 0);

  const CocktailName = ({ mobile }) => (<Typography sx={{
    fontWeight: 900, fontSize: 32, mt: 5, mr: { xs: 7, sm: 5 }, ml: { xs: 2, sm: 0 },
    display: { xs: mobile ? 'block' : 'none', sm: mobile ? 'none' : 'block' }, color: 'text.primary'
  }}>
    {cocktail.strDrink}
  </Typography>);

  const Instructions = ({ mobile }) =>
  (<Box sx={{ mt: 2, mb: { xs: 3, sm: 0 }, pl: 2, pr: 2, display: { xs: mobile ? 'block' : 'none', sm: mobile ? 'none' : 'block' } }}>
    <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 3 }}
    >INSTRUCTIONS:</Typography>
    <Typography
      color='text.secondary'
      // {darkMode ? 'text.disabled' : 'text.secondary'}
      sx={{ fontFamily: 'Poppins', fontWeight: 400 }}
    >{cocktail.strInstructions}</Typography>
  </Box>);

  const [fetchIngredient, isLoading] = useFetching(async (text) => {
    try {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + text);
      const data = await res.json();
      if (data.ingredients.length === 1) setIngredient(data.ingredients[0])
      else toast.info('Something wrong!');
    }
    catch (err) {
      return console.log(err);
    }
  });

  const handleClickIngredient = (ingredientName) => {
    fetchIngredient(ingredientName);
  }

  return <Dialog maxWidth="lg" scroll='body' open={openDialog} >
    <Card sx={{ width: { xs: '100%', md: 700, lg: 820 }, bgcolor: 'background.default' }}>
      <IconButton
        aria-label="close"
        onClick={() => setOpenDialog(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.primary'
        }}
      >
        <CloseIcon />
      </IconButton>
      <CocktailName mobile={true} />
      <Instructions mobile={true} />
      <Box sx={{ display: { xs: 'block', sm: 'flex' }, gap: '32px', padding: { xs: '0 20px', sm: 0 } }}>
        <CardMedia
          sx={{ width: { xs: '100%', sm: 288 }, height: { xs: 280, sm: 320 } }}
          image={cocktail.strDrinkThumb}
          title={cocktail.strDrink}
        />
        <Box>
          <CocktailName mobile={false} />
          <Typography color='text.primary' sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 3 }}
          >INGREDIENTS</Typography>
          <Typography color='text.primary' sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: 14, mt: 1, mb: 1 }}
          >Per cocktail</Typography>
          <ul className={darkMode ? "ingredients-list__dark" : "ingredients-list"}>
            {cocktail.strIngredient1 && <li onClick={() => handleClickIngredient(cocktail.strIngredient1)}>{cocktail.strMeasure1} {cocktail.strIngredient1}</li>}
            {cocktail.strIngredient2 && <li onClick={() => handleClickIngredient(cocktail.strIngredient2)}>{cocktail.strMeasure2} {cocktail.strIngredient2}</li>}
            {cocktail.strIngredient3 && <li onClick={() => handleClickIngredient(cocktail.strIngredient3)}>{cocktail.strMeasure3} {cocktail.strIngredient3}</li>}
            {cocktail.strIngredient4 && <li onClick={() => handleClickIngredient(cocktail.strIngredient4)}>{cocktail.strMeasure4} {cocktail.strIngredient4}</li>}
            {cocktail.strIngredient5 && <li onClick={() => handleClickIngredient(cocktail.strIngredient5)}>{cocktail.strMeasure5} {cocktail.strIngredient5}</li>}
            {cocktail.strIngredient6 && <li onClick={() => handleClickIngredient(cocktail.strIngredient6)}>{cocktail.strMeasure6} {cocktail.strIngredient6}</li>}
            {cocktail.strIngredient7 && <li onClick={() => handleClickIngredient(cocktail.strIngredient7)}>{cocktail.strMeasure7} {cocktail.strIngredient7}</li>}
            {cocktail.strIngredient8 && <li onClick={() => handleClickIngredient(cocktail.strIngredient8)}>{cocktail.strMeasure8} {cocktail.strIngredient8}</li>}
            {cocktail.strIngredient9 && <li onClick={() => handleClickIngredient(cocktail.strIngredient9)}>{cocktail.strMeasure9} {cocktail.strIngredient9}</li>}
            {cocktail.strIngredient10 && <li onClick={() => handleClickIngredient(cocktail.strIngredient10)}>{cocktail.strMeasure10} {cocktail.strIngredient10}</li>}
          </ul>
        </Box>
      </Box>
      <Instructions mobile={false} />
      <CardActions sx={{ m: 2, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
        <Button
          variant="contained"
          onClick={() => handleClickFavorite({ cocktail, isFavorite, favorCocktails, setFavorCocktails })}
        >{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</Button>
      </CardActions>
    </Card>
    <IngredientModal
      openDialog={Boolean('strIngredient' in ingredient)}
      setOpenDialog={setIngredient}
      ingredient={ingredient}
      isFavorite={isFavoriteIngred}
    />
  </Dialog>
}