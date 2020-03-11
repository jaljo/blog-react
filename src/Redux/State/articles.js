import { cond, T, always } from 'ramda'
import { ofType } from './../../Utils'

// initial state
export const INITIAL_STATE = {
  articles: [],
  isLoading: false,
  error: null,
}

// action types
export const LOAD_ARTICLES = '@blog-frontend/articles/LOAD_ARTICLES'
export const ARTICLES_LOADED = '@blog-frontend/articles/ARTICLES_LOADED'
export const ERROR = '@blog-frontend/articles/ERROR'

// loadArticles :: () -> Action
export const loadArticles = always({ type: LOAD_ARTICLES })

// articlesLoaded :: [Article] -> Action
export const articlesLoaded = articles => ({
  type: ARTICLES_LOADED,
  articles
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

// articles :: (State, Action *) -> State
export default (state = INITIAL_STATE, action = {}) => cond([
  // wtf wtf wtf
  [ofType(LOAD_ARTICLES), () => ({
    ...state,
      error: null,
      isLoading: true,
  })],

  [ofType(ARTICLES_LOADED), () => ({
    ...state,
    isLoading: false,
    articles: action.articles,
  })],

  [ofType(ERROR), () => ({
    ...state,
    isLoading: false,
    error: action.message,
  })],

  [T, always(INITIAL_STATE)],
])(action)
