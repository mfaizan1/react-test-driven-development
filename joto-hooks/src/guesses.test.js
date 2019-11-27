import React from 'react';
import {mount} from 'enzyme';
import {findByTestAttr} from './test/testutils';
import successContext from './contexts/successContext';
import Input from './components/Input/Input';
import guessedWordsContext from './contexts/guessedWords';
import GuessedWords from './components/GuessedWords/GuessedWords';


function setup(secretWord = 'party', guessedWordsString = []){
    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Input secretWord={secretWord} />
            <GuessedWords />
          </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
      );
    
    const input = findByTestAttr(wrapper,'input');
    const btn = findByTestAttr(wrapper, 'btn');
    guessedWordsString.forEach(elem => {
        const mockEvent = {target : {value: elem}}
        input.simulate('change',mockEvent);
        btn.simulate('click');
    })
    return [ wrapper, input, btn];
}

describe('tests word guessing',()=> {
    let wrapper;
    let input;
    let btn ;
    beforeEach(()=>{
        [wrapper,input, btn] = setup('party',['agile']);
    })

    describe('non-empty guessedwords',()=> {

        describe('correct guess',()=>{
            beforeEach(()=>{
                const mockEvent = {target:{ value: 'party'}}
                input.simulate('change',mockEvent);
                btn.simulate('click');
            })
    
            test('input contains no children',()=>{
                const inputComponent = findByTestAttr(wrapper,'input-comp');
                expect(inputComponent.children().length).toBe(0);
            })
    
            test('have correct number of guessed words rows',()=>{
                const rows = findByTestAttr(wrapper,'guessed-word');
                expect(rows.length).toBe(2);
                
            })
        })
        describe('incorrect guess',()=>{
            beforeEach(()=>{
                const mockEvent = {target:{ value: 'train'}}
                input.simulate('change',mockEvent);
                btn.simulate('click');
            })
            test('input contains have children',()=>{
                const inputComponent = findByTestAttr(wrapper,'input-comp');
                expect(inputComponent.children().length).toBeGreaterThan(0);
            })
            test('input box is there',()=>{
                expect(input.exists()).toBe(true);
            })
            test('have correct number of guessed words rows',()=>{
                const rows = findByTestAttr(wrapper,'guessed-word');
                expect(rows.length).toBe(2);
            })
        })
    })
    

})
