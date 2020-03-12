import { cond, T, always } from 'ramda'
import { ofType } from './../../Utils'

/**
 * @type Article = {
 *    id :: Number
 *    title :: String
 *    slug :: String
 *    content :: String
 *    dateCreation :: String
 *    draft :: Number
 * }
 */

 // initial state
export const INITIAL_STATE = {
  article: {},
  isLoading: false,
  error: null,
}

// action types
export const LOAD_ONE = '@blog-frontend/articleDetails/LOAD_ONE'
export const ONE_LOADED = '@blog-frontend/articleDetails/ONE_LOADED'
export const ERROR = '@blog-frontend/articleDetails/ERROR'

// loadOne :: String -> Action
export const loadOne = slug => ({
  type: LOAD_ONE,
  slug,
})

// oneLoaded :: Article -> Action
export const oneLoaded = article => ({
  type: ONE_LOADED,
  article,
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

// articleDetails :: (State, Action *) -> State
export default (state = INITIAL_STATE, action = {}) => cond([
  // wtf wtf wtf
  [ofType(LOAD_ONE), () => ({
    ...state,
      error: null,
      isLoading: true,
  })],

  [ofType(ONE_LOADED), () => ({
    ...state,
      isLoading: false,
      article: action.article,
  })],

  [ofType(ERROR), () => ({
    ...state,
    isLoading: false,
    error: action.message,
  })],

  [T, always(INITIAL_STATE)],
])(action)
