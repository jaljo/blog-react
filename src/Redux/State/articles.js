import { cond, T, always } from 'ramda'
import { ofType } from './../../Utils'

/**
 * @type Article = {
 *    id :: Number
 *    title :: String
 *    seoTitle :: String
 *    content :: String
 *    dateCreation :: String
 *    draft :: Number
 * }
 */
export const INITIAL_STATE = {
  articles: [],
  article: {},
  isLoading: false,
  error: null,
}

// action types
export const LOAD_ARTICLES = '@blog-frontend/articles/LOAD_ARTICLES'
export const ARTICLES_LOADED = '@blog-frontend/articles/ARTICLES_LOADED'
export const LOAD_ONE = '@blog-frontend/articles/LOAD_ONE'
export const ONE_LOADED = '@blog-frontend/articles/ONE_LOADED'
export const ERROR = '@blog-frontend/articles/ERROR'

// loadArticles :: () -> Action
export const loadArticles = always({ type: LOAD_ARTICLES })

// articlesLoaded :: [Article] -> Action
export const articlesLoaded = articles => ({
  type: ARTICLES_LOADED,
  articles
})

// loadOne :: String -> Action
export const loadOne = seoTitle => ({
  type: LOAD_ONE,
  seoTitle,
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

// blog :: (State, Action *) -> State
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
