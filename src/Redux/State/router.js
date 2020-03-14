import { createReducer } from './../../Utils';

export const INITIAL_STATE = {
  activeRoute: {},
  routes: [],
}

export const REGISTER = '@blog-frontend/router/REGISTER'
export const READY = '@blog-frontend/router/READY'
export const FIND_ROUTE = '@blog-frontend/router/FIND_ROUTE'
export const ROUTE_FOUND = '@blog-frontend/router/ROUTE_FOUND'

// register :: (String, String) -> Action
export const register = (name, pattern) => ({
  type: REGISTER,
  name,
  pattern,
})

// ready :: () -> Action
export const ready = () => ({ type: READY })

// findRoute :: String -> Action
export const findRoute = location => ({
  type: FIND_ROUTE,
  location,
})

// routeFound :: (String, [Any]) -> Action
export const routeFound = (name, parameters) => ({
  type: ROUTE_FOUND,
  name,
  parameters,
})

export default createReducer(INITIAL_STATE, {
  [REGISTER]: (state, { name, pattern }) => ({
    ...state,
    routes: [
      ...state.routes,
      { name, pattern }
    ],
  }),

  [ROUTE_FOUND]: (state, { name, parameters }) => ({
    ...state,
    activeRoute: { name, parameters },
  }),
})

