import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import FavoriteCocktails from '../pages/MyCocktails';
import FavoriteIngredients from '../pages/MyIngredients';

export default function AppRouter() {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/cocktails' element={<FavoriteCocktails />} />
      <Route path='/ingredients' element={<FavoriteIngredients />} />
      {/* <Route path='/about' element={<About />} />
      <Route path="*" element={<Error />} /> */}
    </Routes>
  )
}