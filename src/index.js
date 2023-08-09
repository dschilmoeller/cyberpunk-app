import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// this handles theming. Certain elements are called by ID (e.g. modals) in app.css
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['Orbitron'],
      textTransform: 'none',
      fontSize: 16,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    {/* <ThemeProvider theme={theme}> */}
    <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
