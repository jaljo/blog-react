import { cond, T, always } from 'ramda'
import { ofType } from '../Utils'

/**
 * @type Post = {
 *    id :: Number
 *    title :: String
 *    seo_title :: String
 *    content :: String
 *    date_creation :: Date
 *    draft :: Number
 * }
 */
export const INITIAL_STATE = {
  posts: [],
  post: {},
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

// articlesLoaded :: [Post] -> Action
export const articlesLoaded = posts => ({
  type: ARTICLES_LOADED,
  posts
})

// loadOne :: String -> Action
export const loadOne = seoTitle => ({
  type: LOAD_ONE,
  seoTitle,
})

// oneLoaded :: Post -> Action
export const oneLoaded = post => ({
  type: ONE_LOADED,
  post,
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

// blog :: (State, Action *) -> State
export default (state = INITIAL_STATE, action = {}) => cond([
  [ofType(LOAD_ARTICLES), () => ({
    ...state,
      isLoading: true,
  })],

  [ofType(ARTICLES_LOADED), () => ({
    ...state,
    isLoading: false,
    posts: action.posts,
  })],

  [ofType(LOAD_ONE), () => ({
    ...state,
      isLoading: true,
  })],

  [ofType(ONE_LOADED), () => ({
    ...state,
      isLoading: false,
      post: action.post,
  })],

  [ofType(ERROR), () => ({
    ...state,
    isLoading: false,
    error: action.message,
  })],

  [T, always(INITIAL_STATE)],
])(action)
