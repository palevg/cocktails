import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import IngredientModal from "./IngredientModal";
import { toast } from "react-toastify";

export const handleClickFavorite = ({ ingredient, isFavorite, favorIngredients, setFavorIngredients }) => {
  if (isFavorite) {
    const newFavorites = favorIngredients.filter(favItem => favItem.idIngredient !== ingredient.idIngredient);
    localStorage.setItem('favorIngredients', JSON.stringify(newFavorites));
    setFavorIngredients(newFavorites);
    toast.info(`Ingredient "${ingredient.strIngredient}" has been removed from the list of favorites!`);
  } else {
    const favArray = [...favorIngredients];
    favArray.push(ingredient);
    localStorage.setItem('favorIngredients', JSON.stringify(favArray));
    setFavorIngredients(favArray);
    toast.info(`Ingredient "${ingredient.strIngredient}" has been added to your favorites list!`);
  }
}

export default function IngredientCard({ ingredient }) {
  const { favorIngredients, setFavorIngredients } = useContext(DataContext);
  const isFavorite = Boolean(favorIngredients.filter(favItem => favItem.idIngredient === ingredient.idIngredient).length > 0);
  const [openDialog, setOpenDialog] = useState({});

  return <Card sx={{
    width: { xs: 280, sm: 335, md: 395 }, bgcolor: 'background.default',
    border: '1px solid', p: 1, borderColor: 'primary.dark'
  }}>
    <CardContent>
      <Typography sx={{ fontWeight: 900, color: 'text.primary', fontSize: { xs: '26px', sm: '28px', md: '32px' } }}>
        {ingredient.strIngredient}
      </Typography>
      {ingredient.strType && <Typography
        sx={{ fontFamily: 'Poppins', fontWeight: 600, mt: 3, color: 'text.description', fontSize: { xs: '14px', sm: '16px' } }}>
        {ingredient.strType.toUpperCase()}
      </Typography>}
    </CardContent>
    <CardActions sx={{ justifyContent: 'center', mb: 1 }}>
      <Button
        variant="contained"
        sx={{ width: 182 }}
        onClick={() => setOpenDialog(ingredient)}
      >Learn more</Button>
      <Button
        variant="outlined"
        sx={{ width: 141 }}
        onClick={() => handleClickFavorite({ ingredient, isFavorite, favorIngredients, setFavorIngredients })}
        endIcon={isFavorite ? <HeartBrokenIcon /> : <FavoriteIcon />}
      >{isFavorite ? 'Remove' : 'Add to'}</Button>
    </CardActions>
    <IngredientModal openDialog={Boolean('strIngredient' in openDialog)} setOpenDialog={setOpenDialog} ingredient={ingredient} isFavorite={isFavorite} />
  </Card>
}