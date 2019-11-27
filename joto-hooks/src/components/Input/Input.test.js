import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr, checkProps} from '../../test/testutils';
import Input from './Input';
import languageContext from './../../contexts/LanguageContext';
import successContext from './../../contexts/successContext';
import guessedWordsContext  from './../../contexts/guessedWords';
const setup = ({ secretWord='party', language, success}) => {
    secretWord = secretWord || 'party';
    language = language || 'en';
    success = success || false;
    return mount(
    <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
            <guessedWordsContext.GuessedWordsProvider>
            <Input secretWord={secretWord} />
            </guessedWordsContext.GuessedWordsProvider>
        </successContext.SuccessProvider>

        </languageContext.Provider> );
}
describe('renders Input component',()=>{
    it('renders main div',()=>{
        const wrapper =  setup({});
        const InputDiv =  findByTestAttr(wrapper,'input-comp');
        expect(InputDiv.length).toBe(1);
    })

})
test('tests if have secretWord props and type is what is expected',()=>{
    checkProps(Input , {secretWord: 'party'});
})
describe('state controlled input field',()=>{

    const mockSetCurrentGuess =  jest.fn();
    let wrapper;
    beforeEach(()=>{
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(()=>["", mockSetCurrentGuess]);
        wrapper = setup({});
    })
    it('calls onchange function with right argument',()=>{
        const input = findByTestAttr(wrapper, 'input');
        const mockEvent = {target: {value: 'train'}};
        input.simulate('change', mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    })

    it('calls setGuessed word',()=>{
        const button = findByTestAttr(wrapper,'btn');
        button.simulate('click',{preventDefault(){}});
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    })
});

describe('renders component according to language',()=>{
    test('correctly renders submit sring in english',()=>{
        const wrapper = setup({language: 'en'});
        const button = findByTestAttr(wrapper, 'btn');
        expect(button.text()).toBe('Submit')
    })
    test('correctly renders submit sring in emoji',()=>{
        const wrapper = setup({language: 'emoji'});
        const button = findByTestAttr(wrapper, 'btn');
        expect(button.text()).toBe('🚀')
    })
})

test('input component is empty when sucess is true',()=> {
    const wrapper = setup({secretWord: 'party', success: true});
    expect(wrapper.isEmptyRender()).toBe(true);
})