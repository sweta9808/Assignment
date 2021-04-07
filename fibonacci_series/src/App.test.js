import App from './App';
import {  mount } from 'enzyme';
import React from 'react';


describe('Render App', () => {
   let wrapper = mount(<App />);
  it('renders without crashing', () => {
    expect(wrapper.find('.App').exists()).toBeTruthy();
  });
})
