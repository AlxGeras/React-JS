import { UPDATE_NAME } from './actions'

const initialState = {
    name: 'Alexander',
    email: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NAME:
            return {
                ...state, name: action.payload.name, email: action.payload.email
            }
        default:
            return state;
    }
}

export default profileReducer