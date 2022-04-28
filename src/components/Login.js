import { Login as Login_ } from "@mui/icons-material";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/AuthProvider";
import { getProfileNameWithFB } from "../midllewares/middleware";
import { useInputStyles } from "../styles/inputStyles";

const Login = () => {

    const classes = useInputStyles();
    const inputField = useRef();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let from = location.state?.from?.pathname || '/';

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            dispatch(getProfileNameWithFB(email))
            await auth.signin({ email, password }, () => {
                setTimeout(() => navigate(from, { replace: true }), 1000)
            })


        } catch (e) {
            toast.error(e)
            setError(e)
        }
    }

    return <div className={classes.formWrap}>
        <ToastContainer />
        <form className={classes.form} onSubmit={onSubmit}>
            <fieldset className={classes.inputScreen}>
                <legend className={classes.legend}>
                    Форма входа
                </legend>
                <TextField
                    inputRef={inputField}
                    variant="outlined"
                    size="small"
                    type='email'
                    label="Введите email"
                    className={classes.inputLine}
                    value={email}
                    helperText={" "}
                    onChange={handleEmail}
                    autoFocus
                    required
                />
                <div className={classes.textFieldWrap}>
                    <TextField
                        inputRef={inputField}
                        variant="outlined"
                        size="small"
                        label="Введите пароль"
                        className={classes.inputLine}
                        type='password'
                        value={password}
                        error={/^.{0,5}$/.test(password)}
                        onChange={handlePassword}
                        autoFocus
                        required
                    />
                    <FormHelperText id="component-helper-text"
                        error={/^.{0,5}$/.test(password)}>
                        {/^.{0,5}$/.test(password) ? 'Длина пароля должна быть не менее 6 символов' : ` `}
                    </FormHelperText>
                </div>
                <div className={classes.regBtnWrap}>
                    {error && <p>{error}</p>}
                    <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        endIcon={<Login_ />}
                        className={classes.regBtn}
                    >
                        Войти
                    </Button>
                </div>
            </fieldset>
        </form>
    </div>
}

export default Login