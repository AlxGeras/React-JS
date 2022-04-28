import MessagesScreen from "../components/MessagesScreen";
import { useState } from 'react';
import InputScreen from "../components/InputScreen";
import { makeStyles } from "@mui/styles";
import ChatsScreen from "../components/ChatsScreen";
import {
  useParams,
} from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMessageWithFB, bindChatIdToProfile, bindProfileToChatId } from "../midllewares/middleware";
import { getAuthorEmail, getAuthorName } from "../store/profile/selectors";

function Chats(props) {
  const useStyles = makeStyles(() => ({
    chatsListWindow: {
      width: "300px",
      border: "0px solid",
      display: "flex",
      flexDirection: "column",
      overflowY: 'scroll'
    },
  }));

  const { chatId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [valueText, setTextValue] = useState('');
  const name = useSelector(getAuthorName, shallowEqual);
  const email = useSelector(getAuthorEmail, shallowEqual);

  const handleChangeText = (event) => {
    setTextValue(event.target.value);
  }

  const handleMes = (event) => {
    if (valueText) {
      const newMes = { author: name, text: valueText, email: email };
      dispatch(addMessageWithFB(chatId, newMes))
      dispatch(bindChatIdToProfile(chatId, email))
      dispatch(bindProfileToChatId(chatId, email))
    }
    setTextValue('');
  }


  return (
    <div className="App">
      <header className={`App-header`} >
        <div className="wrapper">
          <div className={classes.chatsListWindow}>
            <ChatsScreen chatId={chatId} />
          </div>
          <div className='App-header-wrap'>
            <MessagesScreen />
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