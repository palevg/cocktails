import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { handleClickFavorite } from './IngredientCard';
import { Dialog, Card, CardContent, IconButton, Typography, CardActions, Button, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function IngredientModal({ openDialog, setOpenDialog, ingredient, isFavorite }) {
  const { darkMode, favorIngredients, setFavorIngredients } = useContext(DataContext);

  return <Dialog maxWidth="lg" scroll='body' open={openDialog} >
    <Card sx={{ width: { xs: '100%', md: 700, lg: 820 }, bgcolor: 'background.default', p: 1 }}>
      <IconButton
        aria-label="close"
        onClick={() => setOpenDialog({})}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.primary'
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Typography sx={{ fontWeight: 900, fontSize: 32, mt: 2, mr: 4, color: 'text.primary' }}
        >{ingredient.strIngredient}</Typography>
        <Divider sx={{ display: { xs: 'none', sm: 'block' }, mt: 4, borderColor: 'primary.dark' }} />
        {ingredient.strDescription && <Typography color='text.primary'
          sx={{ fontFamily: 'Poppins', fontWeight: 400, lineHeight: '28px', mt: 4 }}
        >{ingredient.strDescription}</Typography>}
        <ul className={darkMode ? "features-list__dark" : "features-list"}>
          {ingredient.strType && <li>Type: {ingredient.strType}</li>}
          {ingredient.strAlcohol === 'Yes'
            ? ingredient.strABV === null
              ? <li>Alcohol: {ingredient.strAlcohol}</li>
              : <li>Alcohol by volume: {ingredient.strABV}%</li>
            : <li>Alcohol: {ingredient.strAlcohol}</li>}
        </ul>
      </CardContent>
      <CardActions sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
        <Button
          variant="contained"
          onClick={() => handleClickFavorite({ ingredient, isFavorite, favorIngredients, setFavorIngredients })}
        >{isFavorite ? 'Remove from favorite' : 'Add to favorite'}</Button>
      </CardActions>
    </Card>
  </Dialog >
}