import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ChatsScreen from "./components/ChatsScreen";
import Chats from "./components/Chats";
import { Home } from "./components/Home";
import Profile from "./components/Profile/Profile";
import './App.css';
import { useState } from 'react';



function App() { 

  const initialChats = [
    {
      id: 0,
      name: "Чат 1",
      list: [{author: 'Me', text: 'first chat'}]
    },
    {
      id: 1,
      name: "Чат 2",
      list : [{author: 'Me', text: 'second chat'}],
    },
  ]
  
  const [chatsList] = useState(initialChats);
    

  return (
    <div className="App">
    <header className = {`App-header`} >
  <BrowserRouter>
    <div className="navwrap">
    <ul className="App-link">
    <li>
      <Link className="navlink" to="/">Home</Link>
    </li>
<li>
      <Link  className="navlink" to="/chats">Chats</Link>
    </li>
    <li>
      <Link  className="navlink" to="/profile">Profile</Link>
    </li>    
  </ul>
  </div>


  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile" element={<Profile />} />
    <Route path="chats">
      <Route index element={<ChatsScreen /*chats= {chatsList}  handleAddChat={handleAddChat} handleDelChat= {handleDelChat}*/ /> } />
      <Route path=":chatId" element={
      <Chats chatsList= {chatsList}/>
      } />
    </Route>
    /<Route path="*" element={<h3>404</h3>} />

  </Routes>
</BrowserRouter>

</header>
      </div>)

}

export default App;
