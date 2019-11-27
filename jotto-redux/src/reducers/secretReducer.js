import {actionsTypes} from './../actions/index'
export default (state = null, action) => {
    switch(action.type){
        case actionsTypes.SET_SECRET_WORD :
            return action.payload;
        default:
            return state;
    }

}