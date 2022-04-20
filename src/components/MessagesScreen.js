import React, {useState} from "react";
import {DialogTitle, List, TextField} from "@mui/material";
import {ListItem} from "@mui/material";
import {ListItemText} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListSubheader from '@mui/material/ListSubheader';
import {Button, ListItemAvatar, Avatar, Typography, Dialog} from "@mui/material";
import {Add, AccountCircle,Android  } from '@mui/icons-material/';
import { getAuthorName } from "../store/profile/selectors";
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { addChat } from "../store/chats/actions";
import { getMessageList } from "../store/messages/selectors";
import { useParams } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  messagesScreen: {
    flex: '1',
    border: "0px solid",
    background: '#0288d1',
  },
}));



/** Экран вывода сообщений */
function MessagesScreen() {
  const classes = useStyles();
  const name  = useSelector(getAuthorName, shallowEqual);
  const dispatch = useDispatch();
  let {chatId} = useParams();


  const messagesStore =  useSelector(getMessageList, shallowEqual); 
  const messages = messagesStore.messageList[chatId] || []

  const isAuthorBot = (author) => {
    return author === 'bot'
  }

  const [visible, setVisible] = useState(false)
  const [chatName, setChatName] =useState('')


  const handleChatName = (e) => {
    setChatName(e.target.value)
  }

  const handleAdd = () => {
     setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleSave = () => {
    dispatch(addChat(chatName))
    handleClose();
    setChatName('')
  }

  const listItems = messages.map((message, i) => (
    
    <ListItem alignItems="flex-start" key={i}>
    <ListItemAvatar>
      <Avatar alt="Remy Sharp"  sx={{ bgcolor: '#2196f3'}}> {isAuthorBot(message.author)? <Android/> : <AccountCircle/>} </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={isAuthorBot(message.author)? 'bot' : name}
      secondary={
        <React.Fragment> 
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {message.text  }
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
  ));

  return (
    <div className={classes.messagesScreen}>
      <List 
            sx={{ width: '100%', minWidth: 360, bgcolor: 'background.default'  ,color: '#ffffff'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
              <Button
              size="small"
              variant="contained"
              endIcon={<Add />}
              className="addButton"
              onClick={handleAdd}
            > Add Chat
            </Button>
              <Dialog open={visible} onClose={handleClose}>
                <DialogTitle>Введите имя нового чата</DialogTitle>
                <TextField
                placeholder="Chat name"
                value= {chatName}
                onChange = {handleChatName}
                />
                              <Button
              size="small"
              variant="contained"
              endIcon={<Add />}
              className="addButton"
              onClick={handleSave}
            > Add Chat
            </Button>
              </Dialog>

                Список сообщений
              </ListSubheader>
            }dense={true} disablePadding={true}>{listItems}</List>
    </div>
  );
}

export default MessagesScreen;
