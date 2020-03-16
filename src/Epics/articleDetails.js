import { map, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import { pipe, evolve, complement, isEmpty } from 'ramda'
import {
  LOAD_ONE,
  error,
  oneLoaded,
} from './../Redux/State/articleDetails'

// loadOneArticleEpic :: Epic -> Observable Action ONE_LOADED ERROR
export const loadOneArticleEpic = (action$, state$, { fetchApi, parseHtml }) =>
  action$.pipe(
    ofType(LOAD_ONE),
    withLatestFrom(state$),
    map(([ _, { router } ]) => router.activeRoute),
    filter(complement(isEmpty)),
    filter(({ name }) => name === 'article-details'),
    mergeMap(({ parameters }) => from(
      fetchApi(`/articles/${parameters.slug}`)
    ).pipe(
      map(pipe(
        evolve({ content: parseHtml }),
        oneLoaded,
      )),
      catchError(msg => of(error(msg))),
    )),
  )

export default combineEpics(
  loadOneArticleEpic,
)
