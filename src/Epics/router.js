import { switchMap, tap, map, withLatestFrom, filter, ignoreElements, catchError } from 'rxjs/operators'
import { fromEvent, merge, of, iif, throwError } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import {
  CHANGE_ROUTE,
  FIND_ROUTE,
  READY,
  REGISTER,
  error,
  findRoute,
  routeFound,
  registered,
} from './../Redux/State/router'
import {
  complement,
  equals,
  evolve,
  filter as rfilter,
  fromPairs,
  head,
  ifElse,
  isEmpty,
  isNil,
  length,
  match,
  o,
  pipe,
  prop,
  slice,
  zip,
} from 'ramda'

// routeValid :: [String] -> String -> Action
export const routeValid = (parameters = []) => pipe(
  match(/\(.*?\)/g),
  length,
  equals(parameters.length),
)

export const nonMatchingParametersNumberException = `
  Number of catching parenthesis in pattern does not match number of named
  parameters specified
`

// registerRouteEpic :: Epic -> Observable Action REGISTERED ERROR
export const registerRouteEpic = action$ =>
  action$.pipe(
    ofType(REGISTER),
    switchMap(action => of(action).pipe(
      // validates that the pattern is a correct regex
      tap(({ pattern }) => new RegExp(pattern)),
      // ensure that named parameters match catched parameters
      map(ifElse(
        ({ pattern, parameters }) => routeValid(parameters)(pattern),
        ({ name, pattern, parameters }) => registered(name, pattern, parameters),
        () => { throw nonMatchingParametersNumberException },
      )),
      catchError(message => of(error(message))),
    )),
  )

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

// findRouteEpic :: Epic -> Observable Action ROUTE_FOUND
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
  registerRouteEpic,
  resolveFirstLocationEpic,
)
