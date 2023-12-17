import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataContextProvider } from './context/DataContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>
);