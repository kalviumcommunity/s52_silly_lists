
import {ADD_CONTENT,SET_USERNAME} from './actionType'

export const addContent = (payload) => {
    return {type:ADD_CONTENT,payload}
}


export const setUserName = (payload) => {
    return {type:SET_USERNAME,payload}
}