import MessagesScreen from "../components/MessagesScreen";
import { useEffect, useState } from 'react';
import InputScreen from "../components/InputScreen";
import { makeStyles } from "@mui/styles";
import ChatsScreen from "../components/ChatsScreen";
import {
    useParams,
  } from "react-router";

function Chats(props) {
    let messageList;
    const { chatId } = useParams();
    const chatsList = props.chatsList;

    const useStyles = makeStyles(() => ({
      chatsListWindow: {
        width: "160px",
        minHeight: "100vh",
        border: "0px solid",
        display: "flex",
        flexDirection: "column",
      },
    }));
  
    const classes = useStyles();
    const [valueText, setTextValue] = useState('');
    const [messageListClone, setMessageListClone] = useState([],);

    useEffect(() => {
      setTimeout( () => {
        props.handleBotMes(chatId)
      }
        ,1500);
      }, [messageListClone]);
       
      const handleChangeText = (event) => {
        setTextValue(event.target.value);
        }

        const handleMes = (event) => {
            if (valueText) {
                const newMes = {author: 'Me', text: valueText};
                props.sendMes(chatId, newMes)
                setMessageListClone(prevPerson => {
                  return [
                    ...prevPerson, 
                   {author: 'Me', text: valueText} 
                  ]
                });
            }
            setTextValue('');
            }
            

        if (!chatsList[chatId]) {
          messageList = []
        }
        else{
          messageList = chatsList[chatId].list;
        }

  
    return (
      <div className="App">
        <header className = {`App-header`} >
          <div className="wrapper">
        <div className={classes.chatsListWindow}>
            <ChatsScreen chats={chatsList} chatId={chatId}  handleAddChat={props.handleAddChat}  handleDelChat= {props.handleDelChat}/>
          </div>
          <div className='App-header-wrap'>
        <MessagesScreen messages={messageList} handleAddChat={props.handleAddChat} />
          <InputScreen
              value={valueText}
              onChange={handleChangeText}
              onSendMessage={handleMes}
              name={"Me"}
            />
            </div>
            </div>
        </header>
      </div>
    );
  }
  
  export default Chats;