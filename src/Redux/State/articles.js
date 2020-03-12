import { createReducer } from './../../Utils'

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
export const loadArticles = () => ({ type: LOAD_ARTICLES })

// articlesLoaded :: [Article] -> Action
export const articlesLoaded = articles => ({
  type: ARTICLES_LOADED,
  articles: articles || [],
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

// articles :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [LOAD_ARTICLES]: state => ({
    ...state,
    error: null,
    isLoading: true,
  }),

  [ARTICLES_LOADED]: (state, { articles }) => ({
    ...state,
    isLoading: false,
    articles,
  }),

  [ERROR]: (state, { message }) => ({
    ...state,
    isLoading: false,
    error: message,
  }),
})
