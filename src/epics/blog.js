import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import {
  LOAD_BLOG_POSTS,
  LOAD_ONE,
  blogPostsLoaded,
  oneLoaded,
} from '../modules/blog'

// loadBlogFeedEpic :: Observable Action Error -> Observable Action.BLOG_POSTS_LOADED
const loadBlogFeedEpic = action$ => action$.pipe(
  ofType(LOAD_BLOG_POSTS),
  mergeMap(action =>
    ajax.getJSON(`${process.env.REACT_APP_API}/blog/posts`)
  ),
  map(blogPostsLoaded),
  catchError(error => console.error(error)),
)

// loadOnePostEpic :: Observable Action Error -> Observable Action .ONE_LOADED
const loadOnePostEpic = (action$, store$) => action$.pipe(
  ofType(LOAD_ONE),
  mergeMap(action =>
    ajax.getJSON(`${process.env.REACT_APP_API}/blog/posts/${action.seoTitle}`)
  ),
  map(oneLoaded),
  catchError(error => console.error(error)),
)

export default combineEpics(
  loadBlogFeedEpic,
  loadOnePostEpic,
)
