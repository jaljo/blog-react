import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import {
  LOAD_ARTICLES,
  LOAD_ONE,
  articlesLoaded,
  error,
  oneLoaded,
} from '../Redux/State/articles'
import { of, from } from 'rxjs'

// loadArticlesEpic :: Epic -> Observable Action ARTICLES_LOADED
const loadArticlesEpic = action$ => action$.pipe(
  ofType(LOAD_ARTICLES),
  mergeMap(() => from(
    // wtf
    ajax.getJSON(`${process.env.REACT_APP_API}/blog/posts`)
  ).pipe(
    map(articlesLoaded),
    catchError(msg => of(error(msg))),
  )),
)

// loadOneArticleEpic :: Epic -> Observable Action ONE_LOADED
const loadOneArticleEpic = action$ => action$.pipe(
  ofType(LOAD_ONE),
  mergeMap(action => from(
    //wtf
    ajax.getJSON(`${process.env.REACT_APP_API}/blog/posts/${action.seoTitle}`)
  ).pipe(
    map(oneLoaded),
    catchError(msg => of(error(msg))),
  )),
)

export default combineEpics(
  loadArticlesEpic,
  loadOneArticleEpic,
)
