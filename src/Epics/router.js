import { ignoreElements, tap, map, withLatestFrom, filter } from 'rxjs/operators'
import { fromEvent, merge } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import {
  FIND_ROUTE,
  READY,
  findRoute,
  routeFound,
} from './../Redux/State/router'
import {
  complement,
  evolve,
  filter as rfilter,
  head,
  isEmpty,
  isNil,
  o,
  pipe,
  prop,
  slice,
} from 'ramda'

export const resolveFirstLocationEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(READY),
    map(() => findRoute(window.location.pathname)),
  )

export const findRouteEpic = (action$, state$) => action$.pipe(
  ofType(FIND_ROUTE),
  withLatestFrom(state$),
  // match location against route registry
  map(([ { location }, { router } ]) => router.routes.map(
    route => ({
      ...route,
      matches: location.match(new RegExp(route.pattern))
    })
  )),
  // only keep matching route candidates
  map(rfilter(o(complement(isNil), prop('matches')))),
  filter(complement(isEmpty)),
  map(pipe(
    head,
    evolve({ matches: slice(1, Infinity)}),
    ({ name, matches }) => routeFound(name, matches),
  )),
)

//
const historyChangedEpic = (action$, state$, { window }) =>
  merge(
    fromEvent(window, 'popstate'),
    fromEvent(window, 'pushstate'),
  ).pipe(
    tap(console.warn),
    ignoreElements(),
  )

export default combineEpics(
  findRouteEpic,
  historyChangedEpic,
  resolveFirstLocationEpic,
)
