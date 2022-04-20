import { ADD_CHAT, DEL_CHAT} from "./actions"

const initialChats = {chatList: [
    /*{
      id: 0,
      name: "Чат 1",
    },
    {
      id: 1,
      name: "Чат 2",
    },*/
  ]}

  const chatsReducer = (state = initialChats, action) => {
    switch(action.type){
        case ADD_CHAT:
            return{
                ...state, 
                chatList: [...state.chatList,
                {
                    id: String(state.chatList.length),
                    name: action.payload
                }
                ]
            }
            case DEL_CHAT:
              const newChatList = [...state.chatList]
              newChatList.splice(action.payload,1)
              return{
                  ...state, 
                  chatList: [...newChatList
                  ]
              }
        default: 
        return state;
    } 
  }

  export default chatsReducer;