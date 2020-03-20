import {
  has,
  pipe,
} from 'ramda'
import { StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'

/**
 * Redux utilities
 */

// createReducer :: (State, Object) -> (Maybe State, Object) -> State
export const createReducer = (INITAL_STATE, actions) => (state, action = {}) =>
  has('type', action) && has(action.type, actions)
    ? actions[action.type](state, action)
    : state
      ? state
      : INITAL_STATE

/**
 * Date utilities
 */

// toEnglishDate :: String -> String
export const toEnglishDate = pipe(
  isoDate => new Date(isoDate),
  date => date.toLocaleDateString(
    'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  ),
)

/**
 * Test utils
 */

// createObservabelState :: Object -> Observable State
export const createObservableState = state =>
  new StateObservable(new Subject(), state)
