export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE'
export const ADD_MESSAGE_WITH_SAGA = 'MESSAGES::ADD_MESSAGE_WITH_SAGA'
export const DEL_MESSAGES = 'MESSAGES::DEL_MESSAGES'
export const UPDATE_MESSAGES = 'MESSAGES::UPDATE_MESSAGES'

export const addMessage = (chatId, message) => ({
    type: ADD_MESSAGE,
    payload: { chatId, message }
})

export const delMessage = (chatId) => ({
    type: DEL_MESSAGES,
    payload: { chatId }
})



export const addMessageWithThunk = (chatId, message) => (dispatch, getState) => {
    dispatch(addMessage(chatId, message))

    if (message.author !== 'bot') {
        const botMessage = { text: 'Ваше сообщение доставлено', author: 'bot' }
        setTimeout(() => dispatch(addMessage(chatId, botMessage)), 2000)
    }

}

export const updateMessages = (chatId, messages) => ({
    type: UPDATE_MESSAGES,
    chatId,
    messages
})