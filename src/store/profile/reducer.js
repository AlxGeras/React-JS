import {CLICK_CHECKBOX} from './actions'

const initialState = {
    status: false,
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case CLICK_CHECKBOX:
            return {...state, status: !state.status};
        default:
            return state; 
    }
}

export default profileReducer