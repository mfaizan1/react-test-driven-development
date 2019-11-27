import React from 'react';
import Enzyme , {shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';


Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = (props={}, state=null) => {
    const wrapper =  shallow(<App {...props} />);
    if(state) wrapper.setState(state);
    return wrapper;
}

const findByTestAttr = (wrapper,value) => {
    return  wrapper.find(`[data-test="${value}"]`)
}
test('renders without error', () => {
    const wrapper =  setup();
    const appComponent =  findByTestAttr(wrapper,'component-app');
    expect(appComponent.length).toBe(1);
})
test('renders button', () => {
    const wrapper =  setup();
    const btn =  findByTestAttr(wrapper,'increment-btn');
    expect(btn.length).toBe(1);
})
test('renders counter text', () => {
    const wrapper = setup();
    const counter =   findByTestAttr(wrapper,'counter-text');
    expect(counter.length).toBe(1);
})

test('counter starts at 0', () => {
    const wrapper = setup();
    const initalState =  wrapper.state('counter');
    expect(initalState).toBe(0);
})

test('clicking increments counter display', () => {
    const counter  = 7;
    const wrapper = setup(null, {counter} );
    const btn = findByTestAttr(wrapper,'increment-btn');
    btn.simulate('click');
    const counterText =   findByTestAttr(wrapper,'counter-text');
    expect(counterText.text()).toContain(counter+1);
})
test('renders decrement btn', () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper,'decreement-btn');
    expect(btn.length).toBe(1);
})
test('clickng decrement', () => {
    const counter = 7;
    const wrapper = setup(null, {counter, belowZero: false});
    const btn = findByTestAttr(wrapper,'decreement-btn');
    btn.simulate('click');
    const counterText =   findByTestAttr(wrapper,'counter-text');
    expect(counterText.text()).toContain(counter-1);
})
test('going below zero will render error message', () => {
    const counter = 0;
    const wrapper = setup(null, {counter, belowZero: false});
    const btn = findByTestAttr(wrapper,'decreement-btn');
    btn.simulate('click');
    const counterText =   findByTestAttr(wrapper,'counter-text');
    expect(counterText.text()).toContain(0);
    const errorText =   findByTestAttr(wrapper,'error-p');
    expect(errorText.text()).toContain('Cannot go below zero');
});

test('going back from below zero will remove error message', () => {
    const counter = 0;
    const wrapper = setup(null, {counter, belowZero: false});
    const btnDec = findByTestAttr(wrapper,'decreement-btn');
    const btnInc = findByTestAttr(wrapper,'increment-btn');
    btnDec.simulate('click');
    let counterText =   findByTestAttr(wrapper,'counter-text');
    expect(counterText.text()).toContain(0);
    let errorText =   findByTestAttr(wrapper,'error-p');
    expect(errorText.text()).toContain('Cannot go below zero');
    btnInc.simulate('click');
    counterText =   findByTestAttr(wrapper,'counter-text');
    expect(counterText.text()).toContain(counter+1);
    errorText =   findByTestAttr(wrapper,'error-p');
    expect(errorText.text()).toBe('');

})