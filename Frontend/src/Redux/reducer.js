import {ADD_CONTENT,SET_USERNAME} from './actionType'

const initialState={
    content:[],
    user:{
        isLogin : false,
        userName : "",
        profile : ""
    },
}

export const reducerFunction = (state=initialState,action) => {
    switch(action.type){
        case ADD_CONTENT:
            return {...state,content:action.payload}
        case SET_USERNAME:
            return {...state,user:action.payload}
        default:
            return state;
    }
}