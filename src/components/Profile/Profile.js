import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateName } from '../../store/profile/actions'
import { getAuthorEmail, getAuthorName } from "../../store/profile/selectors";
import { changeProfileNameWithFB } from "../../midllewares/middleware";


const Profile = () => {

  const dispatch = useDispatch();

  const name = useSelector(getAuthorName, shallowEqual);
  const email = useSelector(getAuthorEmail, shallowEqual);

  const [value, setValue] = useState('')

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const saveName = () => {
    dispatch(changeProfileNameWithFB(value, email))
    //dispatch(updateName(value))
    //setValue('')
  }

  return (
    <>
      <blockquote>Текущее имя: {name}</blockquote>
      <TextField name='name' label='name' placeholder="Введите ваше имя" value={value} onChange={handleInput} />
      <Button onClick={saveName}>Сохранить</Button>
    </>
  );
};

export default Profile;
