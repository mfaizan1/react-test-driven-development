import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from './../test/testutils'
import GuessedWords from './GuessedWords';

const defaultProps = {
    guessedWords : [{guessedWord: 'train', letterMatch: 4}]
}

const setup = (props ={}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps} />);
}

test('doesnt throw warning with expected props', ()=> {
    checkProps(GuessedWords, defaultProps);
})

describe('if there are no guessed words', () => {

    let wrapper;
    beforeEach(()=>{
        wrapper = setup({guessedWords: [] });
    })
    test('render without error',()=>{
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    })
    test('render intructions ',()=>{
        const instructions = findByTestAttr(wrapper, 'guess-word-instructions');
        expect(instructions.text().length).not.toBe(0);
    })
})
describe('if there are guessed words', () => {
    let wrapper;
    const guessedWords = [
        {guessedWord: 'train', letterMatch: 3},
        {guessedWord: 'agile', letterMatch: 1},
        {guessedWord: 'party', letterMatch: 5}

    ]
    beforeEach(()=>{
        wrapper = setup({guessedWords });
    })
    test('render without error',()=>{
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    })
    test('render guessed words section',()=>{
        const guessedWordsList = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsList.length).toBe(1);
    })
    test('render guessed word list',()=>{
        const guessedWordsList = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsList.length).toBe(guessedWords.length);
    })
    test('dont render intructions ',()=>{
        const instructions = findByTestAttr(wrapper, 'guess-word-instructions');
        expect(instructions.exists()).toBeFalsy()
    })
})