import {storeFactory } from './test/testutils';
import { guessWord } from './actions/index';

describe('guessWord action dispatcher',()=>{
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';
    describe('no guessed words',()=>{
        let store;
        const initialState = {secretWord};
        beforeEach(()=>{
            store = storeFactory(initialState);
        })
        test('updates state successfully for unsuccessful guess',()=>{
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState =  {
                ...initialState,
                success: false,
                guessedWords: [
                    { guessedWord: unsuccessfulGuess, letterMatch: 3 }
                ]
            }
            expect(newState).toEqual(expectedState);
        })
        test('updates state successfully for successful guess',()=>{
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState =  {
                ...initialState,
                success: true,
                guessedWords: [
                    { guessedWord: secretWord, letterMatch: 5 }
                ]
            }
            expect(newState).toEqual(expectedState);
            
        })
    })
    describe('some guessed words',()=>{
        let store;
        const guessedWords = [{ guessedWord: 'agile', letterMatch: 0 },{ guessedWord: 'rata', letterMatch: 3 }]
        const initialState = {guessedWords, secretWord};
        beforeEach(()=>{
            store = storeFactory(initialState);
        })
        test('updates state successfully for unsuccessful guess',()=>{
            store.dispatch(guessWord(unsuccessfulGuess))
            const newState= store.getState();
            const expectedState = {
                secretWord,
                success: false,
                guessedWords : [...guessedWords, { guessedWord: unsuccessfulGuess, letterMatch: 3 }]
            }
            expect(newState).toEqual(expectedState);

        })
        test('updates state successfully for successful guess',()=>{
            store.dispatch(guessWord(secretWord))
            const newState= store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords : [...guessedWords, { guessedWord: secretWord, letterMatch: 5 }]
            }
            expect(newState).toEqual(expectedState);
        })
    })
})