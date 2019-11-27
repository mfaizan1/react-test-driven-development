import React from 'react';
import {shallow} from 'enzyme';

import {findByTestAttr, storeFactory} from '../test/testutils';
import Input,{UnConnectedInput} from './Input';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper =  shallow(<Input store={store} />).dive().dive();
    return wrapper;
}
describe('renders',()=>{

    describe('word has not been guessed',()=>{

        let wrapper;
        beforeEach(()=>{
            const initialState = {success: false};
            wrapper = setup(initialState);
        })
        test('renders without error',()=>{
            const component = findByTestAttr(wrapper,'input-component')
            expect(component.length).toBe(1);

        })
        test('renders input box  when success is false',()=> {
            const component = findByTestAttr(wrapper,'guess-input')
            expect(component.length).toBe(1);
        })
    
        test('renders submit button when success is false',()=> {
            const component = findByTestAttr(wrapper,'submit-btn')
            expect(component.length).toBe(1);
        })
        test('does not renders message when success is false',()=> {
            const component = findByTestAttr(wrapper,'success-msg')
            expect(component.length).toBe(0);
        })
    })
    describe('word has  been guessed',()=>{


        let wrapper;
        beforeEach(()=>{
            let initialState = { success: true}
            wrapper= setup(initialState);
        })
        test('renders without error',()=>{
            const component = findByTestAttr(wrapper,'input-component')
            expect(component.length).toBe(1);

        })
        test('does not renders input box when success is true',()=> {
            const component = findByTestAttr(wrapper,'guess-input')
            expect(component.length).toBe(0);
        })
    
        test('does not renders submit button when success is true',()=> {
            const component = findByTestAttr(wrapper,'submit-btn')
            expect(component.length).toBe(0);
            
        })
        test('renders message success is true',()=> {
            const component = findByTestAttr(wrapper,'success-msg');
            expect(component.length).toBe(1);
        })
    })

})

describe('redux props',()=>{
    test('tests if compoenent have success variable in props',()=> {
        const success = true;
        const wrapper = setup({success})
        const successProp =  wrapper.instance().props.success;
        expect(successProp).toBe(success);

    })
    test('"guessword" action creator is in props',()=> {
        const wrapper = setup()
        const guessWordProp =  wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    })

    test('"guessword" is now fire upon button click if state is empty',()=> {
        const mockFunc = jest.fn()
        const wrapper = shallow(<UnConnectedInput guessWord={mockFunc} success={false} />)
        const button = findByTestAttr(wrapper, 'submit-btn');
        button.simulate('click',{preventDefault(){}});
        expect(mockFunc.mock.calls.length).toBe(0);
    })

    test('calls "guessword" with right argument',()=> {
        const mockFunc = jest.fn()
        const guessWord = 'party';
        const wrapper = shallow(<UnConnectedInput guessWord={mockFunc} success={false} />)
        wrapper.setState({ guessWord })
        const button = findByTestAttr(wrapper, 'submit-btn');
        button.simulate('click', {preventDefault(){}});
        expect(mockFunc.mock.calls[0][0]).toBe(guessWord);
    })

})