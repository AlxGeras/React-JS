import MessagesScreen from "../components/MessagesScreen";
import { useEffect, useState } from 'react';
import InputScreen from "../components/InputScreen";
import { makeStyles } from "@mui/styles";
import ChatsScreen from "../components/ChatsScreen";
import {
    useParams,
  } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { getChatList } from "../store/chats/selectors";
import { getMessageList } from "../store/messages/selectors";
import { addMessage } from "../store/messages/actions";

function Chats(props) {
  const useStyles = makeStyles(() => ({
    chatsListWindow: {
      width: "300px",
      minHeight: "100vh",
      border: "0px solid",
      display: "flex",
      flexDirection: "column",
    },
  }));

    let messageList;
    const { chatId } = useParams();

    const chats  = useSelector(getChatList, shallowEqual);
    const messageStore  = useSelector(getMessageList, shallowEqual);
    console.log('messageStore:' , messageStore);
    messageList= messageStore.messageList[chatId] || [];

    const chatList = chats.chatList
    const dispatch = useDispatch();
  
    const classes = useStyles();
    const [valueText, setTextValue] = useState('');

    useEffect(() => {
      let timerId;
      console.log(messageList);
        if(
          messageList?.length > 0 &&
          messageList[messageList.length-1].author !== 'bot'
        )
          {
            console.log(1111111);
            const newMessage = {text: 'Ваше сообщение доставлено', author: 'bot'}
            timerId = setInterval(()=>{
              dispatch(addMessage(chatId, newMessage))
            },1500)
          }
      
        return () => {
          if (timerId){
            clearInterval(timerId)
          }
        }}
      , [messageList, chatId]);
       
      const handleChangeText = (event) => {
        setTextValue(event.target.value);
        }
      
        const handleMes = (event) => {
          if (valueText) {
              const newMes = {author: 'Me', text: valueText};
              dispatch(addMessage(chatId, newMes))
          }
          setTextValue('');
          }
            

    return (
      <div className="App">
        <header className = {`App-header`} >
          <div className="wrapper">
        <div className={classes.chatsListWindow}>
            <ChatsScreen  chatId={chatId} />
          </div>
          <div className='App-header-wrap'>
        <MessagesScreen/>
          <InputScreen
              value={valueText}
              onChange={handleChangeText}
              onSendMessage= {handleMes}
              name={"Me"}
            />
            </div>
            </div>
        </header>
      </div>
    );
  }
  
  export default Chats;