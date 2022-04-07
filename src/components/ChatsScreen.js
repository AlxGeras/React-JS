import React from "react";
import {List} from "@mui/material";
import {ListItem} from "@mui/material";
import {ListItemText} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import {Delete} from '@mui/icons-material';
import {Button} from "@mui/material";
import {Add} from '@mui/icons-material/';
import classNames from 'classnames';


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
    width : '160px',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },
}));

function AddBtn(props) {
  if (props.chats.length === 0 && window.location.href.split('/').pop()==='chats') {
    return (
      <Button
      size="small"
      variant="contained"
      endIcon={<Add />}
      className="addButton"
      onClick={() => {props.handleAddChat()
      }}
    > Add Chat
    </Button>
    )
  }
  else return null; 
    
}

function SelectChat(props){
  if (props.condition){
    return (<span>Выберите чат</span>)
  }
  else {
    return null;
  }
}

function ChatsScreen(props) {
  const classes = useStyles();
  console.log()

  const listItems = props.chats.map((chat, i) => (
    <ListItem key={i} className= 'chatitem'>
       <NavLink className={'navlink'}
         to={`/chats/${i}`}
        >
      <ListItemText>
        <span className={ +props.chatId === i ? classes.chatIdSelected : classes.chatId}>
          {"[ "}
          {chat.id}
          {" ] "}
        </span>
        <span className={classes.chatName}>{chat.name}</span>
        
      </ListItemText>
      </NavLink>
      <Delete className="delBtn" onClick= {() => {props.handleDelChat(i)}}/>
    </ListItem>
  ));




  return (
    <div className={classNames(classes.chatsScreen, window.location.href.split('/').pop()==='chats'? classes.chatsWrap: '')}>

      <SelectChat condition={window.location.href.split('/').pop()==='chats'}/>
      <AddBtn chats={props.chats} handleAddChat= {props.handleAddChat}/>
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
