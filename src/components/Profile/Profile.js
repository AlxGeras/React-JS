import React, { useCallback } from "react";
import {Checkbox} from "@mui/material";
import {FormControlLabel} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/Store";
import {selectCheckBox} from '../../store/profile/actions'


const Profile = () => {

  const {status} = store.getState()
  const dispatch = useDispatch();

  const handleChange = useCallback(()=> {
    dispatch(selectCheckBox)
  }, [dispatch])
 const { res } = useSelector((state) => state);

  return (
    <>
      <FormControlLabel
        control={
                  <Checkbox checked={status} onChange={handleChange} color="primary" />
        }
      />
    </>
  );
};

export default Profile;
