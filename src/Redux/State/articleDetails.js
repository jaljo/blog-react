import { createReducer } from './../../Utils'

/**
 * @type Article = {
 *   id :: Number
 *   title :: String
 *   slug :: String
 *   content :: String
 *   dateCreation :: String
 *   draft :: Number
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

// loadOne :: () -> Action
export const loadOne = () => ({ type: LOAD_ONE })

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
export default createReducer(INITIAL_STATE, {
  [LOAD_ONE]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),

  [ONE_LOADED]: (state, { article }) => ({
    ...state,
    isLoading: false,
    article: article,
  }),

  [ERROR]: (state, { message }) => ({
    ...state,
    isLoading: false,
    error: message,
  }),
})
