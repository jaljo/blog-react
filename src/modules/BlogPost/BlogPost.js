import { cond, T, always } from 'ramda'

// initial state
export const INITIAL_STATE = {
  blogPosts: [],
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
export const blogPostsLoaded = blogPosts => ({
  type: BLOG_POSTS_LOADED,
  blogPosts
})

// reducer
export const reducer = (state = INITIAL_STATE, action = {}) => cond([
  [() => action.type === LOAD_BLOG_POSTS, () => ({
    ...state, ...{
      isLoading: true,
    }
  })],
  [() => action.type === BLOG_POSTS_LOADED, () => ({
    ...state, ...{
      isLoading: false,
      blogPosts: action.blogPosts,
    }
  })],
  [T, always(INITIAL_STATE)],
])()
