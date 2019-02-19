import * as actionTypes from '../actions/actionTypes'
import { combineReducers } from 'redux'

const initialUser = {
    currentUser : null,
    isLoading : true,
    list : []
}

const user_reducer = (state = initialUser , action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                curretUser :  action.payload.currentUser,
                isLoading : false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUser,
                isLoading : false
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user : user_reducer
})

export default rootReducer
