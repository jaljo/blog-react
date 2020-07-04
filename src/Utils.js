import {
  __,
  complement,
  has,
  includes,
  match,
  o,
  pipe,
  prop,
} from 'ramda'

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
 * String utilities
 */

// extractGistIdFromUrl :: String -> String
export const extractGistIdFromUrl = o(prop(1), match(/(\w{32})\.js$/))

// isNotWhiteharacter :: String -> Boolean
export const isNotWhiteCharacter = complement(includes(__, ['\n']))
