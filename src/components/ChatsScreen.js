import React, { useEffect, useState } from "react";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink, useParams } from "react-router-dom";
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Add } from '@mui/icons-material/';
import classNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import { getChatList } from "../store/chats/selectors";
//import { addChat, delChat } from "../store/chats/actions";
//import { delMessage } from "../store/messages/actions";
import { addChatWithFB, deleteChatWithFB, initTrackerWithFB } from "../midllewares/middleware";


const useStyles = makeStyles(() => ({
  chatsScreen: {
    border: "0px solid",
    background: "#596370",
    minHeight: '100vh',
  },
  chatId: {
    color: "#3b51c6",
    fontSize: "120%",
  },
  chatIdSelected: {
    color: "#2196f3",
    fontSize: "120%",
  },
  chatName: {
    color: "#b8b8b8",
    fontSize: "120%",
  },
  chatsWrap: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },
}));

function AddBtn(props) {
  if (props.chats.length === 0 && window.location.href.split('/').pop() === 'chats') {
    return (
      <Button
        size="small"
        variant="contained"
        endIcon={<Add />}
        className="addButton"
        onClick={() => { props.handleClick() }}
      > Add Chat
      </Button>
    )
  }
  else return null;

}

function SelectChat(props) {
  if (props.condition) {
    return (<span>Выберите чат</span>)
  }
  else {
    return null;
  }
}

function ChatsScreen(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const chats = useSelector(getChatList, shallowEqual);
  const chatsList = chats.chatList
  const [visible, setVisible] = useState(false)
  const [chatName, setChatName] = useState('')
  const { chatId } = useParams();

  const currentPathname = new URL(document.location.href).pathname;
  const regularForChatUrl = /.*chats$/i;


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
    dispatch(addChatWithFB(chatName))
    handleClose();
    setChatName('')
  }

  const handleDel = (idx) => {
    dispatch(deleteChatWithFB(idx))
  }

  useEffect(() => {
    dispatch(initTrackerWithFB())
  }, [chatId])

  const listItems = chatsList.map((chat, i) => (
    <ListItem key={chat.id} className='chatItem'>
      <NavLink className={'navlink'}
        to={`/chats/${chat.id}`}
      >
        <ListItemText>
          <span className={chatId === chat.id ? classes.chatIdSelected : classes.chatId}>
            {"[ "}
            {i}
            {" ] "}
          </span>
          <span className={classes.chatName}>{chat.name}</span>

        </ListItemText>
      </NavLink>
      <Delete className="delBtn" onClick={() => { handleDel(chat.id) }} />
    </ListItem>
  ));

  return (
    <div className={classNames(classes.chatsScreen, regularForChatUrl.test(currentPathname) ? classes.chatsWrap : '')}>

      <SelectChat condition={regularForChatUrl.test(currentPathname)} />
      <AddBtn chats={chatsList} handleClick={handleAdd} />
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle>Введите имя нового чата</DialogTitle>
        <TextField
          placeholder="Chat name"
          value={chatName}
          onChange={handleChatName}
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
      <div >
        <List
          sx={{ bgcolor: 'background.secondary' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          dense={true} disablePadding={true}>{listItems}</List>
      </div>
    </div>
  );
}

export default ChatsScreen;
