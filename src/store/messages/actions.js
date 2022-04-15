export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE'
export const DEL_MESSAGES = 'MESSAGES::DEL_MESSAGES'

export const addMessage= (chatId, message) => ({
    type: ADD_MESSAGE,
    payload: {chatId, message}
})

export const delMessage= (chatId) => ({
    type: DEL_MESSAGES,
    payload: {chatId}
})