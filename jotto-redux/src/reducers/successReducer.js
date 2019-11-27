import {actionsTypes} from './../actions/index';

export default (state = false, action) => {
    switch(action.type){
        case  (actionsTypes.CORRECT_GUESS): 
            return true;
        default: 
        return state;
    }

}