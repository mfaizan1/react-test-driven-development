import React from 'react';
import  {mount} from 'enzyme';
import {findByTestAttr} from '../../test/testutils';

import Congrats from './Congrats';
import languageContext from './../../contexts/LanguageContext';
import successContext from './../../contexts/successContext';



const setup = ({language, success}) => {
    language = language || 'en';
    return mount(
    <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
        </successContext.SuccessProvider>
        </languageContext.Provider>)
} 


describe('tests language picker',()=>{
    test('correctly renders congrats component in english',()=>{
        const wrapper = setup({success: true});
        expect(wrapper.text()).toBe('Congratulations! You guessed the word!')

    })
    test('correctly renders congrats component in emoji lang',()=>{
        const wrapper = setup({language:'emoji',success: true});
        expect(wrapper.text()).toBe('🎯🎉')
    })
})

test('renders congrats without anydata' ,()=> {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper,'component-congrats');
    expect(component.length).toBe(1);
})

test('renders nothing when success is  false' ,()=> {
    const wrapper = setup({success: false});
    const component =  findByTestAttr(wrapper, 'component-congrats')
    expect(component.text()).toBe('');
})

test('renders congrats message when success is  true' ,()=> {
    const wrapper = setup({success: true});
    const message =  findByTestAttr(wrapper, 'congrats-message')
    expect(message.text()).toBe('Congratulations! You guessed the word!');
})
