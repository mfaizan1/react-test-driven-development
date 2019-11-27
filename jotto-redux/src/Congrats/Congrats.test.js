import React from 'react';
import  {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from './../test/testutils';

import Congrats from './Congrats';



const defaultProps = { success : true };
const setup = (props = {}, state = null) => {
    const setupProps = { ...defaultProps,...props}
    return shallow(<Congrats {...setupProps} />)
} 


test('renders congrats without anydata' ,()=> {
    const wrapper = setup();
    const component = findByTestAttr(wrapper,'component-congrats');
    expect(component.length).toBe(1);
})

test('renders nothing when success props is  false' ,()=> {
    const wrapper = setup({success: false});
    const component =  findByTestAttr(wrapper, 'component-congrats')
    expect(component.text()).toBe('');
})

test('renders congrats message when success props is  true' ,()=> {
    const wrapper = setup({success: true});
    const message =  findByTestAttr(wrapper, 'congrats-message')
    expect(message.text()).toBe('Congrats! you guessed the right word.');
})

test('doesnot throw warning with expected props',()=>{
    const expectedProps ={ success: false};
    checkProps(Congrats, expectedProps)
})