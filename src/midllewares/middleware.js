import { addMessage, ADD_MESSAGE } from "../store/messages/actions"

const middleware = (store) => (next) => (action) => {/*
    
    if (action.type === ADD_MESSAGE && action.payload.message.author !== 'bot') {
        const newMessage = {text: 'Ваше сообщение доставлено', author: 'bot'}
        setTimeout(()=> store.dispatch(addMessage(action.payload.chatId, newMessage)), 2000)
    }*/
return next(action)
}

export default middleware