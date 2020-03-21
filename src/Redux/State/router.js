import { createReducer } from './../../Utils';
import { pipe, zip, match, slice, fromPairs } from 'ramda'

// initial state
export const INITIAL_STATE = {
  activeRoute: {},
  routes: [],
  error: null,
}

// action types
export const REGISTER = '@blog-frontend/router/REGISTER'
export const REGISTERED = '@blog-frontend/router/REGISTERED'
export const READY = '@blog-frontend/router/READY'
export const CHANGE_ROUTE = '@blog-frontend/router/CHANGE_ROUTE'
export const FIND_ROUTE = '@blog-frontend/router/FIND_ROUTE'
export const ROUTE_FOUND = '@blog-frontend/router/ROUTE_FOUND'
export const ERROR = '@blog-frontend/router/ERROR'

// bad status code to be used in error
export const HTTP_INTERNAL_SERVER_ERROR = 500
export const HTTP_NOT_FOUND = 404

// register :: (String, String, [String]) -> Action
export const register = (name, pattern, parameters = []) => ({
  type: REGISTER,
  name,
  pattern,
  parameters,
})

// registered :: (String, String, [String]) -> Action
export const registered = (name, pattern, parameters) => ({
  type: REGISTERED,
  name,
  pattern,
  parameters,
})

// ready :: () -> Action
export const ready = () => ({ type: READY })

// changeRoute :: String -> Action
export const changeRoute = location => ({
  type: CHANGE_ROUTE,
  location,
})

// findRoute :: String -> Action
export const findRoute = location => ({
  type: FIND_ROUTE,
  location,
})

// routeFound :: (String, Route) -> Action
export const routeFound = (location, route = {}) => ({
  type: ROUTE_FOUND,
  location,
  route,
})

// error :: (Number, String) -> Action
export const error = (httpCode, message) => ({
  type: ERROR,
  httpCode,
  message,
})

// resolveParameters :: Route -> String -> Object
export const resolveParameters = ({ parameters, pattern }) => pipe(
  // extracts parmeters from the path
  match(new RegExp(pattern)),
  slice(1, Infinity),
  // create pairs of parameters and build the final object
  zip(parameters),
  fromPairs,
)

export default createReducer(INITIAL_STATE, {
  [REGISTERED]: (state, { name, pattern, parameters }) => ({
    ...state,
    routes: [
      ...state.routes,
      { name, pattern, parameters }
    ],
  }),

  [ROUTE_FOUND]: (state, { location, route }) => ({
    ...state,
    activeRoute: {
      name: route.name,
      parameters: resolveParameters(route)(location),
    },
    error: null,
  }),

  [ERROR]: (state, { httpCode, message }) => ({
    ...state,
    error: { httpCode, message }
  })
})

