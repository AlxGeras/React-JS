//import { async } from "@firebase/util"
//import { addMessage, ADD_MESSAGE } from "../store/messages/actions"
import { child, get, getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import firebaseConfig from "../services/firebaseConfig";
import { chatListUpdate } from "../store/chats/actions";
import { updateMessages } from '../store/messages/actions';
import { updateName } from '../store/profile/actions';

const middleware = (store) => (next) => (action) => {/*
    
    if (action.type === ADD_MESSAGE && action.payload.message.author !== 'bot') {
        const newMessage = {text: 'Ваше сообщение доставлено', author: 'bot'}
        setTimeout(()=> store.dispatch(addMessage(action.payload.chatId, newMessage)), 2000)
    }*/
    return next(action)
}


export const initTrackerWithFB = () => async (dispatch) => {
    const db = getDatabase(firebaseConfig)
    const chatRef = ref(db, 'chats/')
    onValue(chatRef, (snapshot) => {
        const data = snapshot.val();
        const chatsIds = Object.keys(data);
        const chatArr = chatsIds.map(item => ({
            id: item,
            name: data[item].name
        }))
        dispatch(chatListUpdate(chatArr))
    })
}

export const addProfileWithFB = (name, email) => async () => {
    const db = getDatabase(firebaseConfig)
    const profileRef = ref(db, 'profile/')
    const newprofileRef = push(profileRef)
    set(newprofileRef, { name: name, email: email }).then((res) => {
        console.log('profile added', res);
    })
}

export const getProfileNameWithFB = (email) => async (dispatch) => {
    const dbRef = ref(getDatabase(firebaseConfig));
    const getProfile = await get(child(dbRef, 'profile/'))
    const data = await getProfile.val()
    const objKey = Object.keys(data).find(key => data[key].email === email)
    const profileName = data[objKey].name
    dispatch(updateName(profileName, email))
}

export const changeProfileNameWithFB = (name, email) => async (dispatch) => {
    const db = getDatabase(firebaseConfig)
    const dbRef = ref(db);
    const getProfile = await get(child(dbRef, 'profile/'))
    const data = await getProfile.val()
    const objKey = Object.keys(data).find(key => data[key].email === email)
    const profileRef = ref(db, `profile/${objKey}`)
    set(profileRef, { email: email, name: name, chatsId: data[objKey].chatsId || {} }).then((res) => {
        console.log('prifile name changed', res);
    })
    dispatch(updateName(name, email))

    let getChatsId = await get(child(dbRef, `profile/${objKey}/chatsId`))
    let chatsIdInProfile = await getChatsId.val() || {}

    for (let key in chatsIdInProfile) {
        let getMessages = await get(child(dbRef, `messages/${chatsIdInProfile[key].chatId}`))
        let messages = await getMessages.val()
        for (let keyMes in messages) {
            if (messages[keyMes].email === email) {
                messages[keyMes].author = name
            }
        }
        let messagesRef = ref(db, `messages/${chatsIdInProfile[key].chatId}`)
        set(messagesRef, messages)

    }

}

export const deleteChatWithFB = (id) => async () => {
    const db = getDatabase(firebaseConfig)
    const chatRef = ref(db, `chats/${id}`)
    const messagesRef = ref(db, `messages/${id}`)
    const dbRef = ref(db);
    const getChat = await get(child(dbRef, `chats/${id}`))
    const data = await getChat.val()

    for (let key in data.emails) {
        let getProfile = await get(child(dbRef, 'profile/'))
        let data_ = await getProfile.val()
        let objKey = Object.keys(data_).find(key_ => data_[key_].email === data.emails[key].email)
        let getChatsId = await get(child(dbRef, `profile/${objKey}/chatsId`))
        let ChatsIdInProfile = await getChatsId.val() || {}
        let objKeyChatId = Object.keys(ChatsIdInProfile).find(key => ChatsIdInProfile[key].chatId === id)
        let chatIbOrofileRef = ref(db, `/profile/${objKey}/chatsId/${objKeyChatId}`)
        remove(chatIbOrofileRef)
    }

    remove(chatRef).then((res) => {
        console.log('Chat Removed', res);
    })
    remove(messagesRef).then((res) => {
        console.log('Messages Removed', res);
    })
}

export const bindChatIdToProfile = (chatId, email) => async (dispatch) => {
    const db = getDatabase(firebaseConfig)
    const dbRef = ref(db);
    const getProfile = await get(child(dbRef, 'profile/'))
    const data = await getProfile.val()
    const objKey = Object.keys(data).find(key => data[key].email === email)
    const chatRef = ref(db, `profile/${objKey}/chatsId`)
    const chatsIdProfile = data[objKey].chatsId || {}
    if (!(Object.keys(chatsIdProfile).find(key => chatsIdProfile[key].chatId === chatId))) {
        const newChatRef = push(chatRef)
        set(newChatRef, {
            chatId
        }).then((res) => {
            console.log('prifile name changed', res);
        })
    }
}

export const bindProfileToChatId = (chatId, email) => async (dispatch) => {
    const db = getDatabase(firebaseConfig)
    const dbRef = ref(db);
    const getChat = await get(child(dbRef, 'chats/'))
    const data = await getChat.val()
    const emailRef = ref(db, `chats/${chatId}/emails`)
    const emails = data[chatId].emails || {}
    if (!(Object.keys(emails).find(key => emails[key].email === email))) {
        const newEmailRef = push(emailRef)
        set(newEmailRef, {
            email
        }).then((res) => {
            console.log('prifile name changed', res);
        })
    }
}

export const addChatWithFB = (name) => async () => {
    const db = getDatabase(firebaseConfig)
    const chatRef = ref(db, 'chats/')
    const newChatRef = push(chatRef)
    set(newChatRef, { name: name }).then((res) => {
        console.log('chat added', res);
    })
}



export const addMessageWithFB = (chatId, message) => async () => {
    const db = getDatabase(firebaseConfig)
    const messagesRef = ref(db, `messages/${chatId}`)
    const newMessageRef = push(messagesRef);
    set(newMessageRef, message).then((res) => {
        console.log('message added', res);
    })
}

export const getMessagesByChatidWithFB = (chatId) => async (dispatch) => {
    const db = getDatabase(firebaseConfig)
    const msgRef = ref(db, `/messages/${chatId}`)

    onValue(msgRef, (snapshot) => {
        const data = snapshot.val();
        const msg = data && Object.values(data)
        if (msg?.length > 0) {
            dispatch(updateMessages(chatId, msg))
        }
    })
}

export default middleware