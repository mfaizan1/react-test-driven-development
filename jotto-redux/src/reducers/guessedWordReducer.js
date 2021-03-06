import {actionsTypes} from './../actions';


const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case actionsTypes.GUESS_WORD: 
            return [...state, action.payload];
        default:
            return state;
    }


}