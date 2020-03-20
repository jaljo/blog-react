import { createReducer } from './../../Utils';

export const INITIAL_STATE = {
  activeRoute: {},
  routes: [],
}

export const REGISTER = '@blog-frontend/router/REGISTER'
export const REGISTERED = '@blog-frontend/router/REGISTERED'
export const READY = '@blog-frontend/router/READY'
export const CHANGE_ROUTE = '@blog-frontend/router/CHANGE_ROUTE'
export const FIND_ROUTE = '@blog-frontend/router/FIND_ROUTE'
export const ROUTE_FOUND = '@blog-frontend/router/ROUTE_FOUND'
export const ERROR = '@blog-frontend/router/ERROR'

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

// routeFound :: (String, Object) -> Action
export const routeFound = (name, parameters = {}) => ({
  type: ROUTE_FOUND,
  name,
  parameters,
})

// error :: String -> Action
export const error = message => ({
  type: ERROR,
  message,
})

export default createReducer(INITIAL_STATE, {
  [REGISTERED]: (state, { name, pattern, parameters }) => ({
    ...state,
    routes: [
      ...state.routes,
      { name, pattern, parameters }
    ],
  }),

  [ROUTE_FOUND]: (state, { name, parameters }) => ({
    ...state,
    activeRoute: { name, parameters },
  }),
})

