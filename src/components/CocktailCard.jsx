import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import CocktailModal from "./CocktailModal";
import { toast } from "react-toastify";

export const handleClickFavorite = ({ cocktail, isFavorite, favorCocktails, setFavorCocktails }) => {
  if (isFavorite) {
    const newFavorites = favorCocktails.filter(favItem => favItem.idDrink !== cocktail.idDrink);
    localStorage.setItem('favorCocktails', JSON.stringify(newFavorites));
    setFavorCocktails(newFavorites);
    toast.info(`Cocktail "${cocktail.strDrink}" has been removed from the list of favorites!`);
  } else {
    const favArray = [...favorCocktails];
    favArray.push(cocktail);
    localStorage.setItem('favorCocktails', JSON.stringify(favArray));
    setFavorCocktails(favArray);
    toast.info(`Cocktail "${cocktail.strDrink}" has been added to your favorites list!`);
  }
}

export default function CocktailCard({ cocktail }) {
  const { favorCocktails, setFavorCocktails } = useContext(DataContext);
  const isFavorite = Boolean(favorCocktails.filter(favItem => favItem.idDrink === cocktail.idDrink).length > 0);
  const [openDialog, setOpenDialog] = useState(false);

  return <Card sx={{
    width: { xs: 280, sm: 335, md: 395 }, height: { xs: 420, sm: 541, md: 556 },
    border: '1px solid', bgcolor: 'background.default', borderColor: 'primary.dark'
  }}>
    <CardMedia
      sx={{ height: { xs: 280, sm: 395 } }}
      image={cocktail.strDrinkThumb}
      title={cocktail.strDrink}
    />
    <CardContent>
      <Typography sx={{
        textAlign: 'center', fontWeight: '700', mt: 1, height: { xs: 'auto', sm: '42px', md: '56px' },
        fontSize: { xs: cocktail.strDrink.length > 18 ? '20px' : '26px',
          sm: cocktail.strDrink.length > 20 ? '22px' : '28px', md: cocktail.strDrink.length > 20 ? '24px' : '32px'
        }
      }}>
        {cocktail.strDrink}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'center' }}>
      <Button
        variant="contained"
        sx={{ width: 182 }}
        onClick={() => setOpenDialog(true)}
      >Learn more</Button>
      <Button
        variant="outlined"
        sx={{ width: 141 }}
        onClick={() => handleClickFavorite({ cocktail, isFavorite, favorCocktails, setFavorCocktails })}
        endIcon={isFavorite ? <HeartBrokenIcon /> : <FavoriteIcon />}
      >{isFavorite ? 'Remove' : 'Add to'}</Button>
    </CardActions>
    <CocktailModal openDialog={openDialog} setOpenDialog={setOpenDialog} cocktail={cocktail} isFavorite={isFavorite} />
  </Card>
}