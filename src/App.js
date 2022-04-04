import './App.css';
import MessagesScreen from "./MessagesScreen";
import { useEffect, useState } from 'react';
import InputScreen from "./InputScreen";
import { makeStyles } from "@mui/styles";
import ChatsScreen from "./ChatsScreen";



function App(props) {

  const useStyles = makeStyles(() => ({
    chatsListWindow: {
      width: "120px",
      minHeight: "100vh",
      border: "0px solid",
      display: "flex",
      flexDirection: "column",
    },
  }));

  const classes = useStyles();
  const [messageList, setMessageList] = useState([],);
  const [valueText, setTextValue] = useState('');
  const [chatsList, setChatsList] = useState([]);
  const [valueChatIdx, setChatIdx] = useState(0);

  useEffect(() => {
    setTimeout( () => {
      if (messageList.length !==0 && messageList[messageList.length-1].author !=='bot') {
        const lastAuthor = messageList[messageList.length-1].author; 
        setMessageList(prevPerson => {
        return [
          ...prevPerson, 
         {author: 'bot', text: `${lastAuthor} ваше сообщение доставлено`} 
        ]
      })}
    }
      ,1500);

    }, [messageList]);

    useEffect(() => {
      setChatsList((prev) => [
        ...prev,
        {
          id: 0,
          name: "Чат 1",
          list: []
        },
      ]);
      setChatsList((prev) => [
        ...prev,
        {
          id: 1,
          name: "Чат 2",
          list : [],
        },
      ]);
    }, [])

    useEffect(() => {
      if (chatsList.length !== 0) {
        setMessageList(chatsList.find(el => el.id === valueChatIdx).list)
      }
      
    },[valueChatIdx, chatsList])

    const handleChangeChat = (idx) => {
      if (valueChatIdx!== idx) {
        chatsList.find(el => el.id === valueChatIdx).list = messageList;
      setChatIdx(idx);}
    }

    const handleChangeText = (event) => {
      setTextValue(event.target.value);
      }

  const sendMes = (event , props) => {
    if (valueText) {
      setMessageList(prevPerson => {
    return [
      ...prevPerson, 
     {author: 'Me', text: valueText} 
    ]
  });
    }
    setTextValue('');
    }
    

  return (
    <div className="App">
      <header className = {`App-header`} >
      <div className={classes.chatsListWindow}>
          <ChatsScreen chats={chatsList} onChange = {handleChangeChat} chatId= {valueChatIdx} />
        </div>
        <div className='App-header-wrap'>
      <MessagesScreen messages={messageList} />
        <InputScreen
            value={valueText}
            onChange={handleChangeText}
            onSendMessage={sendMes}
            name={"Me"}
          />
          </div>
      </header>
    </div>
  );
}

export default App;
