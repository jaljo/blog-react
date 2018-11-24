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
}

// action types
export const LOAD_BLOG_POSTS = '@blog-react/blogpost/LOAD_BLOG_POSTS'
export const BLOG_POSTS_LOADED = '@blog-react/blogpost/BLOG_POSTS_LOADED'
export const LOAD_ONE = '@blog-react/blogpost/LOAD_ONE'
export const ONE_LOADED = '@blog-react/blogpost/ONE_LOADED'

// loadBlogPosts :: () -> Action.LOAD_BLOG_POSTS
export const loadBlogPosts = always({ type: LOAD_BLOG_POSTS })

// blogPostsLoaded :: [Post] -> Action.BLOG_POSTS_LOADED
export const blogPostsLoaded = posts => ({
  type: BLOG_POSTS_LOADED,
  posts
})

// loadOne :: String -> Action.LOAD_ONE
export const loadOne = seoTitle => ({
  type: LOAD_ONE,
  seoTitle,
})

// oneLoaded :: Post -> Action.ONE_LOADED
export const oneLoaded = post => ({
  type: ONE_LOADED,
  post,
})

// blog :: (State, Action *) -> State
export default (state = INITIAL_STATE, action = {}) => cond([
  [ofType(LOAD_BLOG_POSTS), () => ({
    ...state,
      isLoading: true,
  })],
  [ofType(BLOG_POSTS_LOADED), () => ({
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
  [T, always(INITIAL_STATE)],
])(action)
