import React from 'react';
import App from './App';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './test/testutils'
import hookActions from './actions/hookActions';

const setup = (initialState={}) => {
  const wrapper =  shallow(<App />);
  return wrapper;
}


const mockGetSecretWord = jest.fn();

const setupForUseEffect = (secretWord = 'party') => {

  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  const mockreducerFunc = jest.fn().mockReturnValue(
    [
      {secretWord, language: 'en'},
      jest.fn()
    ]
  )
  React.useReducer = mockreducerFunc;
  //Mount can be replaced with shallow if github.com/airbnb/enzyme/issues/2086 gets resolved 
  return mount(<App />);

}
describe('it test props of app',()=>{
  it('check if app renders without error',()=>{
    const wrapper = setupForUseEffect();
    expect(wrapper.exists()).toBe(true);
  })
})
describe('getSecretWord tests',()=>{
  it('tests if getSecretWord is called on app mount',()=>{
    setupForUseEffect();
    expect(mockGetSecretWord).toHaveBeenCalled();
  })
  it('secrete word doesnot update on app update',()=>{
    const wrapper = setupForUseEffect();
    mockGetSecretWord.mockClear();
    wrapper.setProps()
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  })
})

describe('when secretWord is not null',()=>{
  let wrapper ;

  beforeEach(()=>{
    wrapper = setupForUseEffect();
  })

  it('checks app is rendered when secretWord is not Null',()=>{
    const appComponent = findByTestAttr(wrapper, 'app');
    expect(appComponent.exists()).toBe(true);
  })
  it('checks spinner is not rendered when secretWord is not Null',()=>{
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  })
})
describe('when secretWord is null',()=>{
  let wrapper ;

  beforeEach(()=>{
    wrapper = setupForUseEffect(null);
  })

  it('checks app is not rendered when secretWord is Null',()=>{
    const appComponent = findByTestAttr(wrapper, 'app');
    expect(appComponent.exists()).toBe(false);
  })
  it('checks spinner is rendered when secretWord is Null',()=>{
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  })
})
