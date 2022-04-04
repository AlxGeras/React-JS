import React from "react";
import {List} from "@mui/material";
import {ListItem} from "@mui/material";
import {ListItemText} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  chatsScreen: {
    border: "0px solid",
    background: "#596370",
    minHeight: '100vh'
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
}));

function ChatsScreen(props) {
  const classes = useStyles();

  const listItems = props.chats.map((chat, i) => (
    <ListItem key={i}  onClick={() => props.onChange(i)}>
      <ListItemText>
        <span className={ props.chatId === i ? classes.chatIdSelected : classes.chatId}>
          {"[ "}
          {chat.id}
          {" ] "}
        </span>
        <span className={classes.chatName}>{chat.name}</span>
      </ListItemText>
    </ListItem>
  ));

  return (
    <div className={classes.chatsScreen}>
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
