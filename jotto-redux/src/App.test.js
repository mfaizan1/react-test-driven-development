import React from 'react';
import ReactDOM from 'react-dom';
import App,{UnconnectedApp} from './App';
import { Provider } from 'react-redux'
import {shallow} from 'enzyme';
import  { storeFactory } from './test/testutils';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper =  shallow(<App store={store} />).dive().dive();
  return wrapper;
}
describe('it test props of app',()=>{
  it('checks if app have guessdWords array as props',()=>{
    const guessedWords = [{guessedWord: 'train', letterMatch: 3}];
    const wrapper =  setup({guessedWords});
    const guessedWordProps = wrapper.instance().props.guessedWords; 
    expect(guessedWordProps).toEqual(guessedWords);
  })
  it('checks if app have success as props',()=>{
    const success = false;
    const wrapper =  setup({success});
    const guessedWordProps = wrapper.instance().props.success; 
    expect(guessedWordProps).toEqual(success);
  })
  it('checks if app have setSecretWord funtion as props',()=>{
    const success = false;
    const wrapper =  setup({success});
    const guessedWordProps = wrapper.instance().props.setSecreteWord; 
    expect(guessedWordProps).toBeInstanceOf(Function);
  })
  it('checks if getSecretWord runs on app mount',()=>{
    const getSecretWordMock = jest.fn();
    const wrapper = shallow(<UnconnectedApp guessedWords={[]} success={true} setSecreteWord={getSecretWordMock} />);
    wrapper.instance().componentDidMount();
    const count = getSecretWordMock.mock.calls.length;
    expect(count).toBe(1);
  })
})
