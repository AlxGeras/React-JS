import { ADD_MESSAGE, DEL_MESSAGES, UPDATE_MESSAGES } from "./actions"

const initialState = {
    messageList: {}
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            const { chatId, message } = action.payload;
            const oldMessages = state.messageList[chatId] || []
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [chatId]: [
                        ...oldMessages, {
                            ...message,
                            id: `${chatId}${oldMessages.length}`
                        }
                    ]
                }
            }
        }
        case DEL_MESSAGES: {
            const { chatId } = action.payload;
            let newMessageList = { ...state.messageList }
            delete newMessageList[chatId]
            console.log(newMessageList);
            return {
                ...state,
                messageList: newMessageList
            }
        }
        case UPDATE_MESSAGES: {
            return {
                ...state,
                messageList: {
                    ...state.messageList, [action.chatId]: action.messages
                }
            }
        }
        default:
            return state
    }
}

export default messagesReducer