import MessagesScreen from "../components/MessagesScreen";
import { useState } from 'react';
import InputScreen from "../components/InputScreen";
import { makeStyles } from "@mui/styles";
import ChatsScreen from "../components/ChatsScreen";
import {
    useParams,
  } from "react-router";
import { useDispatch } from "react-redux";
import { addMessageWithThunk } from "../store/messages/actions";

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

    const { chatId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [valueText, setTextValue] = useState('');

       
      const handleChangeText = (event) => {
        setTextValue(event.target.value);
        }
      
        const handleMes = (event) => {
          if (valueText) {
              const newMes = {author: 'Me', text: valueText};
              dispatch(addMessageWithThunk(chatId, newMes))
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