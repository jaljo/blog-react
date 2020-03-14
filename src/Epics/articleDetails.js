import { map, mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import { pipe, evolve } from 'ramda'
import {
  LOAD_ONE,
  error,
  oneLoaded,
} from './../Redux/State/articleDetails'

// loadOneArticleEpic :: Epic -> Observable Action ONE_LOADED ERROR
export const loadOneArticleEpic = (action$, state$, { fetchApi, parseHtml }) =>
  action$.pipe(
    ofType(LOAD_ONE),
    mergeMap(({ slug }) => from(
      fetchApi(`/articles/${slug}`)
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
