import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Provider } from "react-redux";

import {PersistGate} from 'redux-persist/es/integration/react'
import persistor, { store } from './store/Store';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default : '#1C72AA',
      secondary : '#000000'
    },
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#212121',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme = {theme}>
      <PersistGate persistor= {persistor} loading={<CircularProgress/>}>
    <Provider store={store}>
      <App/>
      </Provider>
      </PersistGate>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

