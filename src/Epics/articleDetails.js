import { map, mergeMap, catchError, withLatestFrom, filter } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import { pipe, evolve, hasPath } from 'ramda'
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
    filter(hasPath([1, 'router', 'activeRoute', 'parameters', 'slug'])),
    mergeMap(([ _, state ]) => from(
      fetchApi(`/articles/${state.router.activeRoute.parameters.slug}`)
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
