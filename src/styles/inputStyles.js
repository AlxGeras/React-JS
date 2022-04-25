import { makeStyles } from "@mui/styles";

export const useInputStyles = makeStyles(() => ({
    inputScreen: {
        border: "1px solid #2196f3",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        width: '300px',
        gap: '30px',
        marginTop: "10%"
    },
    inputLine: {
        width: "100%",
    },
    regBtnWrap: {
        width: "100%",
    },
    regBtn: {
        width: "100%",
    },
    logBtn: {
        marginTop: '30px',
        width: "100%",
    },
    textFieldWrap: {
        width: "100%",
    },

    legend: {
        textAlign: 'initial',
        color: '#0288d1',
        fontSize: '24px',
        marginBottom: '20px',
    },
    formWrap: {
        alignSelf: 'center',
    },
    loginLink: {
        textDecoration: 'none'
    },
}));