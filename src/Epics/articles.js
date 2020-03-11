import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import {
  LOAD_ARTICLES,
  LOAD_ONE,
  articlesLoaded,
  error,
  oneLoaded,
} from '../Redux/State/articles'
import { of, from } from 'rxjs'

// loadArticlesEpic :: Epic -> Observable Action ARTICLES_LOADED ERROR
export const loadArticlesEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(LOAD_ARTICLES),
    mergeMap(() => from(
      fetchApi('/blog/posts')
    ).pipe(
      map(articlesLoaded),
      catchError(msg => of(error(msg))),
    )),
  )

// loadOneArticleEpic :: Epic -> Observable Action ONE_LOADED ERROR
export const loadOneArticleEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(LOAD_ONE),
    mergeMap(({ seoTitle }) => from(
      fetchApi(`/blog/posts/${seoTitle}`)
    ).pipe(
      map(oneLoaded),
      catchError(msg => of(error(msg))),
    )),
  )

export default combineEpics(
  loadArticlesEpic,
  loadOneArticleEpic,
)
