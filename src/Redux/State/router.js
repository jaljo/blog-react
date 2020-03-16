import { createReducer } from './../../Utils';

export const INITIAL_STATE = {
  activeRoute: {},
  routes: [],
}

export const REGISTER = '@blog-frontend/router/REGISTER'
export const READY = '@blog-frontend/router/READY'
export const CHANGE_ROUTE = '@blog-frontend/router/CHANGE_ROUTE'
export const FIND_ROUTE = '@blog-frontend/router/FIND_ROUTE'
export const ROUTE_FOUND = '@blog-frontend/router/ROUTE_FOUND'

// register :: (String, String, [String]) -> Action
export const register = (name, pattern, parameters = []) => ({
  type: REGISTER,
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

export default createReducer(INITIAL_STATE, {
  [REGISTER]: (state, { name, pattern, parameters }) => ({
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

