import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';
Enzyme.configure({ adapter: new EnzymeAdapter() });
it('renders without crashing', () => {
  const wrapper = shallow(<App />)
  // console.log(wrapper.debug());
  expect(wrapper).toBeTruthy();
  // expect(wrapper).toBeFalsy();
});
