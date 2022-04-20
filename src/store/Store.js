import {createStore, combineReducers, applyMiddleware} from 'redux';
import chatsReducer from './chats/reducer.js';
import messagesReducer from './messages/reducer.js';
import profileReducer from './profile/reducer.js';
import creareSagaMiddleware from 'redux-saga'
import mySaga from './sagas.js';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = creareSagaMiddleware();

const persistConfig = {
    key: 'root', 
    storage                             
}

const reducers = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)));

 const persistor = persistStore(store);

 export default persistor

sagaMiddleware.run(mySaga);
