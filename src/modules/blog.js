import { cond, T, always } from 'ramda'

/**
 * @type Post = {
 *    id: Int
 *    title: String
 *    seo_title: String
 *    content: String
 *    date_creation: Date
 *    draft: Int
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

// action creators
// loadBlogPosts :: () -> Action
export const loadBlogPosts = always({ type: LOAD_BLOG_POSTS })

// blogPostsLoaded :: [Post] -> Action
export const blogPostsLoaded = posts => ({
  type: BLOG_POSTS_LOADED,
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

// blog :: (State, Action *) -> State
export default (state = INITIAL_STATE, action = {}) => cond([
  [() => action.type === LOAD_BLOG_POSTS, () => ({
    ...state,
      isLoading: true,
  })],
  [() => action.type === BLOG_POSTS_LOADED, () => ({
    ...state,
    isLoading: false,
    posts: action.posts,
  })],
  [() => action.type === LOAD_ONE, () => ({
    ...state,
      isLoading: true,
  })],
  [() => action.type === ONE_LOADED, () => ({
    ...state,
      isLoading: false,
      post: action.post,
  })],
  [T, always(INITIAL_STATE)],
])()
