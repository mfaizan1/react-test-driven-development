import {getLettermatchCount} from './../utils';
import axios from 'axios';

export const actionsTypes = {
    CORRECT_GUESS : 'CORRECT_GUESS',
    GUESS_WORD : 'GUESS_WORD',
    SET_SECRET_WORD: 'SET_SECRET_WORD'
}

export const setSecreteWord = () => {
    return (dispatch) => {
       return axios.get('http://localhost:3030').then((result) => {
           dispatch({
               type: actionsTypes.SET_SECRET_WORD,
               payload: result.data
           })
        }).catch((err) => {
            
        });
    }
}
export const guessWord = (guessedWord) => {
    return (dispatch, getState) => {
        
        const secretWord = getState().secretWord;
        console.log(guessedWord,secretWord)
        const letterMatch = getLettermatchCount(guessedWord,secretWord);
        dispatch({
            type: actionsTypes.GUESS_WORD,
            payload: {guessedWord, letterMatch}
        });

        if(guessedWord === secretWord){
            dispatch({
                type: actionsTypes.CORRECT_GUESS
            })
        }


    }
}