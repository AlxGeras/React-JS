import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ChatsScreen from "./components/ChatsScreen";
import Chats from "./components/Chats";
import { Home } from "./components/Home";
import Profile from "./components/Profile/Profile";
import './App.css';
import { useState } from 'react';
import Gists from "./components/Gists";
import Registration from "./components/Registration";
import Login from "./components/Login";
import 'react-toastify/dist/ReactToastify.css'
import RequireAuth from "./hocs/RequireAuth";
import { AuthProvider } from "./hooks/AuthProvider";



function App() {

  const initialChats = [
    {
      id: 0,
      name: "Чат 1",
      list: [{ author: 'Me', text: 'first chat' }]
    },
    {
      id: 1,
      name: "Чат 2",
      list: [{ author: 'Me', text: 'second chat' }],
    },
  ]

  const [chatsList] = useState(initialChats);


  return (
    <div className="App">
      <header className={`App-header`} >
        <AuthProvider>
          <BrowserRouter>
            <div className="navwrap">
              <ul className="App-link">
                <li>
                  <Link className="navlink" to="/">Home</Link>
                </li>
                <li>
                  <Link className="navlink" to="/chats">Chats</Link>
                </li>
                <li>
                  <Link className="navlink" to="/profile">Profile</Link>
                </li>
                <li>
                  <Link className="navlink" to="/gists">Gists</Link>
                </li>
                <li>
                  <Link className="navlink" to="/login">Login</Link>
                </li>
                <li>
                  <Link className="navlink" to="/registration">Registration</Link>
                </li>
              </ul>
            </div>


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="registration" element={<Registration />} />
              <Route element={<RequireAuth />}>
                <Route path="profile" element={<Profile />} />
                <Route path="gists" element={<Gists />} />
                <Route path="chats">
                  <Route index element={<ChatsScreen /*chats= {chatsList}  handleAddChat={handleAddChat} handleDelChat= {handleDelChat}*/ />} />
                  <Route path=":chatId" element={
                    <Chats chatsList={chatsList} />
                  } />
                </Route>
              </Route>
              /<Route path="*" element={<h3>404</h3>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>

      </header>
    </div>)

}

export default App;
