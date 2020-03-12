import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import {
  LOAD_ARTICLES,
  articlesLoaded,
  error,
} from '../Redux/State/articles'

// loadArticlesEpic :: Epic -> Observable Action ARTICLES_LOADED ERROR
export const loadArticlesEpic = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(LOAD_ARTICLES),
    mergeMap(() => from(
      fetchApi('/articles')
    ).pipe(
      map(articlesLoaded),
      catchError(msg => of(error(msg))),
    )),
  )

export default combineEpics(
  loadArticlesEpic,
)
