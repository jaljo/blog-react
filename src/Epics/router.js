import { tap, map, withLatestFrom, filter } from 'rxjs/operators'
import { fromEvent, merge } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import {
  CHANGE_ROUTE,
  FIND_ROUTE,
  READY,
  findRoute,
  routeFound,
} from './../Redux/State/router'
import {
  complement,
  evolve,
  filter as rfilter,
  fromPairs,
  head,
  isEmpty,
  isNil,
  o,
  pipe,
  prop,
  slice,
  zip,
} from 'ramda'

// resolveFirstLocationEpic :: Epic -> Observable Action READY
export const resolveFirstLocationEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(READY),
    map(() => findRoute(window.location.pathname)),
  )

// changeRouteEpic :: Epic -> Observable Action FIND_ROUTE
export const changeRouteEpic = (action$, state$, { window }) =>
  action$.pipe(
    ofType(CHANGE_ROUTE),
    tap(({ location }) => window.history.pushState({}, '', location)),
    map(({ location }) => findRoute(location)),
  )

// historyChangedEpic :: Epic -> Observable Action FIND_ROUTE
const historyChangedEpic = (action$, state$, { window }) =>
  merge(
    fromEvent(window, 'popstate'),
    fromEvent(window, 'pushstate'),
  ).pipe(
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
    ({ name, parameters, matches }) => routeFound(
      name,
      fromPairs(zip(parameters, matches))
    ),
  )),
)

export default combineEpics(
  changeRouteEpic,
  findRouteEpic,
  historyChangedEpic,
  resolveFirstLocationEpic,
)
