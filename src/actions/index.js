import * as actionTypes from './actionTypes'
import firebase from '../firebase'


export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user,
            isAdmin : user.email === 'admin@gmail.com' ? true : false
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


export const getUsers = () => {
    return dispatch => {
        firebase.database().ref("users").on("value", snap => {
            dispatch({
                type: actionTypes.GET_USERS,
                payload: snap.val()
            })
        })
    }
}

export const saveUser = (user) => {
    return dispatch => firebase.database().ref("users").push(user)
}

export const deleteUser = (id) => {
    return dispatch => firebase.database().ref("users").child(id).remove()
}


//product
export const getProducts = () => {
    return dispatch => {
        firebase.database().ref("products").on("value", snap => {
            dispatch({
                type: actionTypes.GET_PRODUCTS,
                payload: snap.val()
            })
        })
    }
}

export const getCurrentProduct = (id) => {
    return dispatch => firebase.database().ref("products").child(id)
}

export const saveProduct = (product) => {
    return dispatch => firebase.database().ref("products").push(product)
}

export const deleteProduct = (id) => {
    return dispatch => firebase.database().ref("products").child(id).remove()
}

export const getUsersProduct = (id) => {
    return dispatch => {
         firebase.database().ref("products").child(id).on('value' , snap => {
            dispatch({
                type: actionTypes.GET_USERS_PRODUCTS,
                payload : snap.val()
            })
        })
    }
}
