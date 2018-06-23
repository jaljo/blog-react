import { map, mergeMap } from 'rxjs/operators'
import { ofType, logObservableError } from 'redux-observable'
import { ajax } from 'rxjs/ajax';

import { LOAD_BLOG_POSTS, blogPostsLoaded } from '../modules/blog'

const loadBlogPostsEpic = action$ => action$.pipe(
  ofType(LOAD_BLOG_POSTS),
  mergeMap(action =>
    ajax.getJSON(process.env.REACT_APP_API + '/blog/posts').pipe(
      map(blogPosts => blogPostsLoaded(blogPosts))
    )
  ),
);

export default loadBlogPostsEpic
