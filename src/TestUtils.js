import { StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './Redux/State'
import React from 'react'

// createObservabelState :: Object -> Observable State
export const createObservableState = state =>
  new StateObservable(new Subject(), state)

// create a store without the epic middleware
//
// createTestStore :: () -> Redux.Store
export const createTestStore = () => createStore(rootReducer)

// createContainer :: (React.Component, Store) -> React.Component
export const createContainer = (component, store) => renderer.create(
  <Provider store={store}>
    {component}
  </Provider>
)
