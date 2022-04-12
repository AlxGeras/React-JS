import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Provider } from "react-redux";
import store from './store/Store';

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
    <Provider store={store}>
      <App/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

