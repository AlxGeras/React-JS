import React, { useCallback, useState } from "react";
import {Checkbox} from "@mui/material";
import {FormControlLabel, TextField, Button} from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import store from "../../store/Store";
import {selectCheckBox, updateName} from '../../store/profile/actions'
import { getAuthorName } from "../../store/profile/selectors";


const Profile = () => {

  const dispatch = useDispatch();

  const name  = useSelector(getAuthorName, shallowEqual);

  const [value, setValue] = useState('')

 const { res } = useSelector((state) => state);

 const handleInput = (e) => {
   setValue(e.target.value)
 }

 const saveName = () => {
   dispatch(updateName(value))
   setValue('')
 }

  return (
    <>
    <blockquote>Текущее имя: {name}</blockquote>
      <TextField name = 'name' label='name' placeholder="Введите ваше имя" value={value} onChange={handleInput}/>
        <Button onClick={saveName}>Сохранить</Button>
    </>
  );
};

export default Profile;
