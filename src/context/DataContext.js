import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const breakpoints = { sm: 480, lg: 990 }
const cardsCount = { mobile: 3, tablet: 6, desktop: 9 }

export const DataContextProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const countPerPage = windowWidth > breakpoints.lg
    ? cardsCount.desktop
    : windowWidth <= breakpoints.sm
      ? cardsCount.mobile
      : cardsCount.tablet;
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('cocktDarkMode') === 'true' ? true : false);
  const [cocktails, setCocktails] = useState([]);
  const [favorCocktails, setFavorCocktails] = useState(JSON.parse(localStorage.getItem('favorCocktails')) || []);
  const [favorIngredients, setFavorIngredients] = useState(JSON.parse(localStorage.getItem('favorIngredients')) || []);
  const [symbolToSearch, setSymbolToSearch] = useState({ letter: '', element: null });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <DataContext.Provider
      value={{
        darkMode, setDarkMode, countPerPage, cocktails, setCocktails, favorCocktails, setFavorCocktails,
        favorIngredients, setFavorIngredients, symbolToSearch, setSymbolToSearch, searchText, setSearchText
      }}>
      {children}
    </DataContext.Provider>
  );
}