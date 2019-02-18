import * as actionTypes from './actionTypes'
import firebase from '../firebase'


export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}


export const getUsers = () => {
    let list  = []
    firebase.database().ref("users").on('child_added' , snapshot => {
         list.push(snapshot.val())
    })
    return {
        type: actionTypes.GET_USERS,
        payload : {
            list
        }
    } 
}


