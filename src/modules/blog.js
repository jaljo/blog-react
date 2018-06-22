import { cond, T, always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  posts: [],
  isLoading: false,
}

// action types
export const LOAD_BLOG_POSTS = 'blog-react/blogpost/LOAD_BLOG_POSTS'
export const BLOG_POSTS_LOADED = 'blog-react/blogpost/BLOG_POSTS_LOADED'

// action creators
// loadBlogPosts :: () -> Object
export const loadBlogPosts = () => {
  return always({ type: LOAD_BLOG_POSTS })()
}

// blogPostsLoaded
export const blogPostsLoaded = posts => ({
  type: BLOG_POSTS_LOADED,
  posts
})

// reducer
export default (state = INITIAL_STATE, action = {}) => cond([
  [() => action.type === LOAD_BLOG_POSTS, () => ({
    ...state, ...{
      isLoading: true,
    }
  })],
  [() => action.type === BLOG_POSTS_LOADED, () => ({
    ...state, ...{
      isLoading: false,
      posts: action.posts,
    }
  })],
  [T, always(INITIAL_STATE)],
])()
