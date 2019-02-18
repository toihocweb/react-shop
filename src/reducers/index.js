import * as actionTypes from '../actions/actionTypes'
import { combineReducers } from 'redux'
const initialUser = {
    currentUser : null
}

const user_reducer = (state = initialUser , action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                curretUser :  action.payload.currentUser
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUser
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user : user_reducer
})

export default rootReducer
