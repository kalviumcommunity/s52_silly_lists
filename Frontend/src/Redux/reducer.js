import {ADD_CONTENT} from './actionType'

const initialState={
    content:[]
}

export const reducerFunction = (state=initialState,action) => {
    switch(action.type){
        case ADD_CONTENT:
            return {...state,content:action.payload}
        default:
            return state;
    }
}