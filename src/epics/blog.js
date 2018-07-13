import { map, mergeMap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import {
  LOAD_BLOG_POSTS,
  LOAD_ONE,
  blogPostsLoaded,
  oneLoaded,
} from '../modules/blog'

const api = (process.env.NODE_ENV === 'production')
  ? process.env.REACT_APP_PROD_API
  : process.env.REACT_APP_DEV_API

const loadBlogFeedEpic = action$ => action$.pipe(
  ofType(LOAD_BLOG_POSTS),
  mergeMap(action =>
    ajax.getJSON(`${api}/blog/posts`).pipe(
      map(blogPostsLoaded),
    )
  ),
)

const loadOnePostEpic = (action$, store$) => action$.pipe(
  ofType(LOAD_ONE),
  mergeMap(action =>
    ajax.getJSON(`${api}/blog/posts/${action.seoTitle}`).pipe(
      map(oneLoaded)
    )
  ),
)

export default combineEpics(
  loadBlogFeedEpic,
  loadOnePostEpic,
)
