import { map, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax';

import { LOAD_BLOG_POSTS, blogPostsLoaded } from '../modules/blog'

const api = (process.env.NODE_ENV === 'production')
  ? process.env.REACT_APP_PROD_API
  : process.env.REACT_APP_DEV_API

const loadBlogPostsEpic = action$ => action$.pipe(
  ofType(LOAD_BLOG_POSTS),
  mergeMap(action =>
    ajax.getJSON(api + '/blog/posts').pipe(
      map(blogPosts => blogPostsLoaded(blogPosts))
    )
  ),
);

export default loadBlogPostsEpic
