import {createStore} from 'redux';
import profileReducer from './profile/reducer.js';

const store = createStore(profileReducer);

export default store;
