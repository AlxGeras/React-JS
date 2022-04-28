import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRef, useState } from "react"
import { AssignmentInd, Login } from "@mui/icons-material";
import firebaseConfig from "../services/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'
import FormHelperText from '@mui/material/FormHelperText';
import { useInputStyles } from "../styles/inputStyles";
import { useDispatch } from "react-redux";
import { addProfileWithFB } from "../midllewares/middleware";


const Registration = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth(firebaseConfig);
            await createUserWithEmailAndPassword(auth, email, password);
            dispatch(addProfileWithFB(name, email))
            toast.success('Пользователь успешно зарегестрирован');
            setEmail('');
            setPassword('');

        } catch (e) {
            console.log(e);
        }
    }

    const classes = useInputStyles();
    const inputField = useRef();


    return <div className={classes.formWrap}>
        <ToastContainer />

        <form className={classes.form} onSubmit={onSubmit}>
            <fieldset className={classes.inputScreen}>
                <legend className={classes.legend}>
                    Форма регистрации
                </legend>
                <TextField
                    inputRef={inputField}
                    variant="outlined"
                    size="small"
                    type='text'
                    label="Введите ваше имя"
                    className={classes.inputLine}
                    value={name}
                    helperText={" "}
                    onChange={handleNameChange}
                    autoFocus
                    required
                />
                <TextField
                    inputRef={inputField}
                    variant="outlined"
                    size="small"
                    type='email'
                    label="Введите email"
                    className={classes.inputLine}
                    value={email}
                    helperText={" "}
                    onChange={handleEmailChange}
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
                        onChange={handlePasswordChange}
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
                        endIcon={<AssignmentInd />}
                        className={classes.regBtn}
                    >
                        Регистрация
                    </Button>
                </div>

                <p>Уже зарегестрированы?
                    <Link to='/login' className={classes.loginLink}>
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
                </p>
            </fieldset>
        </form>
    </div>
}

export default Registration