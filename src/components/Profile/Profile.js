import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAuthorEmail, getAuthorName } from "../../store/profile/selectors";
import { changeProfileNameWithFB } from "../../midllewares/middleware";
import SaveAs from '@mui/icons-material/SaveAs';


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
  }

  return (
    <>
      <blockquote>Текущее имя: {name}</blockquote>
      <TextField name='name' label="Введите ваше имя" placeholder="Введите ваше имя" value={value} onChange={handleInput} className='profileNameInput' />
      <Button onClick={saveName} className='profileNameInput' size="large"
        type="submit"
        variant="contained"
        endIcon={<SaveAs />} >Сохранить</Button>
    </>
  );
};

export default Profile;
