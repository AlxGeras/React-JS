import {CLICK_CHECKBOX, UPDATE_NAME} from './actions'

const initialState = {
    name: 'Alexander',
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case CLICK_CHECKBOX:
            return {...state, status: !state.status};
        case UPDATE_NAME:
        return  {
            ...state,name: action.payload
        }
        default:
            return state; 
    }
}

export default profileReducer