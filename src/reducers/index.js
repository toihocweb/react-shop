import * as actionTypes from '../actions/actionTypes'
import { combineReducers } from 'redux'

const initialUser = {
    currentUser : null,
    isLoading : true,
    usersList : null,
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
        case actionTypes.GET_USERS:
        return {
            ...initialUser,
            isLoading : false,
            usersList : action.payload
        }
        default:
            return state
    }
}

const initialProduct = {
    productList : null,
}

const product_reducer = (state = initialProduct , action) => {
    switch(action.type){
        case actionTypes.GET_PRODUCTS:
            return {
                productList : action.payload
            }

        default:
            return state
    }
}


const rootReducer = combineReducers({
    user : user_reducer,
    product : product_reducer
})

export default rootReducer
