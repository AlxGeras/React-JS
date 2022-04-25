import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import chatsReducer from './chats/reducer.js';
import messagesReducer from './messages/reducer.js';
import profileReducer from './profile/reducer.js';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import gistsReducer from './gists/reducer.js';

const combineEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
    key: 'root', 
    storage                             
}

const reducers = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    gists: gistsReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
    persistedReducer,
    combineEnchancers(applyMiddleware(thunk)));

 const persistor = persistStore(store);

 export default persistor

