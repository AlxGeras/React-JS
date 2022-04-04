import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

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
      <App/>
    </ThemeProvider>
  
    
  </React.StrictMode>,
  document.getElementById('root')
);

