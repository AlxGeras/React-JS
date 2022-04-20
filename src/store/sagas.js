import {takeLatest, put, delay} from 'redux-saga/effects'
import { addMessage, ADD_MESSAGE_WITH_SAGA } from './messages/actions'

function* onAddMessageWithSga(action) {
    yield put(addMessage(action.payload.chatId, action.payload.message))
    if (action.payload.message.author !== 'bot'){
        const botMessage = {text: 'Ваше сообщение доставлено', author: 'bot'}
        yield delay(2000)
        yield put(addMessage(action.payload.chatId, botMessage) )
    }
}

function* mySaga() {
    yield takeLatest(ADD_MESSAGE_WITH_SAGA, onAddMessageWithSga);
}

export default mySaga