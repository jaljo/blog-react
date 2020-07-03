import { switchMap, tap, map, withLatestFrom, catchError, ignoreElements } from 'rxjs/operators'
import { fromEvent, merge, of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import {
  CHANGE_ROUTE,
  FIND_ROUTE,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  READY,
  REGISTER,
  error,
  findRoute,
  registered,
  routeFound,
} from './../Redux/State/router'
import {
  complement,
  equals,
  filter as rfilter,
  ifElse,
  isEmpty,
  length,
  match,
  pipe,
} from 'ramda'

// routeValid :: [String] -> String -> Action
export const routeValid = (parameters = []) => pipe(
  match(/\(.*?\)/g),
  length,
  equals(parameters.length),
)

// nonMatchingParametersNumberException :: () -> String
export const nonMatchingParametersNumberException = () => `
  Number of catching parenthesis in pattern does not match number of named
  parameters specified
`
// pageNotFoundException :: String -> String
export const pageNotFoundException = path =>
  `The requested location has not been found: ${path}`

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
        () => { throw nonMatchingParametersNumberException() },
      )),
      catchError(message => of(error(HTTP_INTERNAL_SERVER_ERROR, message))),
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

// pathMatchesRoutePattern :: String -> Route
export const pathMatchesRoutePattern = path => pipe(
  ({ pattern }) => match(new RegExp(pattern), path),
  complement(isEmpty),
)

// findRouteEpic :: Epic -> Observable Action ROUTE_FOUND ROUTE_NOT_FOUND
export const findRouteEpic = (action$, state$) =>
  action$.pipe(
    ofType(FIND_ROUTE),
    switchMap(action => of(action).pipe(
      withLatestFrom(state$),
      // only keep routes that matches the given location
      map(([ action, state ]) => rfilter(
        pathMatchesRoutePattern(action.location),
        state.router.routes,
      )),
      map(ifElse(
        complement(isEmpty),
        ([ route ]) => routeFound(action.location, route),
        () => error(HTTP_NOT_FOUND, pageNotFoundException(action.location)),
      )),
    )),
  )

// scrollToTopOnPageChangeEpic :: Epic -> _
export const scrollToTopOnPageChangeEpic = (action$, state, { window }) =>
  action$.pipe(
    ofType(CHANGE_ROUTE),
    tap(() => window.scroll(0, 0)),
    ignoreElements(),
  )

export default combineEpics(
  changeRouteEpic,
  findRouteEpic,
  historyChangedEpic,
  registerRouteEpic,
  resolveFirstLocationEpic,
  scrollToTopOnPageChangeEpic,
)
