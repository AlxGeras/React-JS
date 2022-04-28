import React, { useRef } from "react";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  inputScreen: {
    border: "0px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLine: {
    flex: 1,
  },
}));

function InputScreen(props) {
  const classes = useStyles();
  const inputField = useRef();

  /** Установка фокуса на поле ввода */
  const focus = () => {
    inputField.current.focus();
  };

  return (
    <div className={classes.inputScreen}>
      <TextField
        inputRef={inputField}
        variant="filled"
        size="small"
        label="Введите текст сообщения"
        inputProps={{ "data-testid": "content-input" }}
        className={classes.inputLine}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.onSendMessage(e);
          }
        }}
        autoFocus
      />
      <Button
        size="large"
        variant="contained"
        endIcon={<Send />}
        className="sendButton"
        onClick={(e) => {
          props.onSendMessage(e);
          focus();
        }}
      >
        Отправить
      </Button>
    </div>
  );
}

export default InputScreen;
