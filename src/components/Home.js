import React from "react";
import { Link } from "react-router-dom";
import { useInputStyles } from "../styles/inputStyles";
import { Button } from "@mui/material";
import { AssignmentInd, Login } from "@mui/icons-material";


export const Home = () => {
  const classes = useInputStyles();
  return <div className={classes.homeWrap}>
    <h4>Вы попали на главную страницу чата</h4>
    <h4>Для использования чата пройдите регистрацию или войдите в уже существующий аккаунт</h4>
    <div className={classes.formWrap}>
      <form className={classes.form}>
        <fieldset className={classes.inputScreen}>
          <div className={classes.regBtnWrap}>
            <p>Уже зарегестрированы? </p>
            <Link to='login' className={classes.loginLink}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                endIcon={<Login />}
                className={classes.logBtn}
              >
                Войти
              </Button>
            </Link>
          </div>
          <div className={classes.regBtnWrap}>
            <p>Регистрация </p>
            <Link to='registration' className={classes.loginLink}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                endIcon={<AssignmentInd />}
                className={classes.logBtn}
              >
                Регистрация
              </Button>
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  </div>


};
