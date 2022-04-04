import React from "react";
import {List} from "@mui/material";
import {ListItem} from "@mui/material";
import {ListItemText} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListSubheader from '@mui/material/ListSubheader';




const useStyles = makeStyles((theme) => ({
  messagesScreen: {
    flex: '1',
    border: "0px solid",
    background: '#0288d1',
  },
}));



/** Экран вывода сообщений */
function MessagesScreen(props) {
  const classes = useStyles();

  const listItems = props.messages.map((message, i) => (
    
    <ListItem key={i}>
      <ListItemText>
        <span>
          {"[ "}
          {message.author}
          {" ] "}
        </span>
        <span >{message.text}</span>
      </ListItemText>
    </ListItem>
  ));

  return (
    <div className={classes.messagesScreen}>
      <List 
            sx={{ width: '100%', minWidth: 360, bgcolor: 'background.default' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Список сообщений
              </ListSubheader>
            }dense={true} disablePadding={true}>{listItems}</List>
    </div>
  );
}

export default MessagesScreen;
