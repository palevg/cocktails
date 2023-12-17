import { useContext } from "react";
import "./styles/App.scss";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { DataContext } from "./context/DataContext";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';

export const appColor = {
  black: '#202025',
  grapefruit: '#FD5103',
  gray: '#5F6775',
  lightgray: '#BDBDBD',
  white: '#F5F5F5',
  whitetext: '#FCFCFC',
  orange: '#FE7031'
}

export default function App() {
  const { darkMode } = useContext(DataContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: appColor.orange,
        light: '#ff9361',
        gray: appColor.gray,
        dark: appColor.grapefruit,
        contrastText: '#fff'
      },
      secondary: {
        main: '#9c27b0'
      },
      text: {
        primary: darkMode ? appColor.whitetext : appColor.black,
        secondary: darkMode ? appColor.lightgray : appColor.gray,
        switchLight: darkMode ? appColor.white : appColor.grapefruit,
        switchDark: darkMode ? appColor.grapefruit : appColor.gray,
        description: darkMode ? appColor.whitetext : appColor.gray,
        disabled: appColor.lightgray
      },
      background: {
        default: darkMode ? appColor.black : appColor.white
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 770,
        lg: 990,
        xl: 1536
      }
    },
    typography: {
      button: {
        textTransform: "none"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <ToastContainer position="top-center" />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}