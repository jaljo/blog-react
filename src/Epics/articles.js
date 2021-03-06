import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import { pipe, defaultTo, evolve, map as rmap } from 'ramda'
import {
  LOAD_ARTICLES,
  articlesLoaded,
  error,
} from '../Redux/State/articles'

// loadArticlesEpic :: Epic -> Observable Action ARTICLES_LOADED ERROR
export const loadArticlesEpic = (action$, state$, { fetchApi, parseHtml }) =>
  action$.pipe(
    ofType(LOAD_ARTICLES),
    mergeMap(() => from(
      fetchApi('/articles')
    ).pipe(
      map(pipe(
        defaultTo([]),
        rmap(evolve({ content: parseHtml })),
        articlesLoaded,
      )),
      catchError(msg => of(error(msg))),
    )),
  )

export default combineEpics(
  loadArticlesEpic,
)
