import {actionsTypes } from './../actions/index';
import successReducer from './successReducer';


test('if no action is passed it should return default state',()=> {
    const newState =  successReducer(undefined, {});
    expect(newState).toBe(false);
});

test ('return state true upon rreciving a action of CORRECT_GUESS',()=> {
    const newState = successReducer(undefined,{type: actionsTypes.CORRECT_GUESS})
    expect(newState).toBe(true);
});