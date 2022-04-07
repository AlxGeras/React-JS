import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ChatsScreen from "./components/ChatsScreen";
import Chats from "./components/Chats";
import { Home } from "./components/Home";
import {Profile} from "./components/Profile";
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
  
  const [chatsList, setChatsList] = useState(initialChats);

  const sendMes = (chatId , message) => {
    let findObj = chatsList.find(el => (el.id === +chatId));
    findObj.name=chatsList[chatId].name
        findObj.list= [...chatsList[chatId].list, message]
    setChatsList([
      ...chatsList 
      ])}

    const handleBotMes = (idx) => {
        let findObj = chatsList.find(el => (el.id === +idx));
        const messageList = findObj.list
          if (messageList.length !==0 && messageList[messageList.length-1].author !=='bot') {
            const lastAuthor = messageList[messageList.length-1].author; 
            const botMes = {author: 'bot', text: `${lastAuthor} ваше сообщение доставлено`};
            findObj.list= [...chatsList[idx].list, botMes]
            setChatsList([
              ...chatsList 
              ])
            }
        }
    

    const handleAddChat = () => {
      let id;
      if (chatsList.length === 0) {
        id = 0
      }
      else{
        id = chatsList[chatsList.length-1].id +1;
      }
      setChatsList([
        ...chatsList,{
          id: id,
          name : `Чат ${id+1}`,
          list : []
        }])
    }

    const handleDelChat = (idx) => {
      chatsList.splice(idx,1)
      setChatsList([...chatsList])
    }




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
      <Route index element={<ChatsScreen chats= {chatsList}  handleAddChat={handleAddChat} handleDelChat= {handleDelChat}/> } />
      <Route path=":chatId" element={
      <Chats chatsList= {chatsList} sendMes= {sendMes} handleAddChat={handleAddChat} handleDelChat= {handleDelChat} handleBotMes={handleBotMes}/>
      } />
    </Route>
    /<Route path="*" element={<h3>404</h3>} />

  </Routes>
</BrowserRouter>

</header>
      </div>)

}

export default App;
