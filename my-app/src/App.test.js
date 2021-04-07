import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react';

import App from './App';

import { reducer, initialState } from './reducer';

const configStore = createStore(reducer, initialState);

const renderWithRedux = (
    component,
    { initialState, store = configStore } = {}
  ) => {
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    }
  }
 
describe('App Test Cases', () => {

    const props = {
        adjustUI: () => {},
        ...initialState,
    }

    it('should take a snapshot', () => {
        const { asFragment } = renderWithRedux(<App {...props} />)
        
        expect(asFragment(<App {...props} />)).toMatchSnapshot()
    });
    
    it('should Department change', () => {
        const { getByTestId } = renderWithRedux(<App {...props} />); 

        fireEvent.change(getByTestId('select-department'));
        fireEvent.change(getByTestId('emp-id'));
        fireEvent.change(getByTestId('get-details'));
        fireEvent.change(getByTestId('clear-all'));
    });

});
