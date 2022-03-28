import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const mesText = 'Hello ReactJS'
const classNamed = 'blue'
const bcgColorBlack = 'bcgColorBlack'


ReactDOM.render(
  <React.StrictMode>
    <App text = {mesText} classByMessage = {classNamed} bcgColorBlack= {bcgColorBlack}/> 
    
  </React.StrictMode>,
  document.getElementById('root')
);

