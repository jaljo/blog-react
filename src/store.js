import { createStore, applyMiddleware } from 'redux'
import { rootReducer, rootEpic } from './modules'
import { createEpicMiddleware } from 'redux-observable'
import { apply, pipe, tap } from 'ramda'

const logger = store => next => pipe(
  tap(action => console.log('Action :: ', action)),
  next,
  tap(() => console.log('State ::', store.getState())),
)

const epicMiddleware = createEpicMiddleware()

// createEpicMiddlewares :: Boolean -> [Middleware]
const createMiddlewares = loggerEnabled => loggerEnabled
    ? [epicMiddleware, logger]
    : [epicMiddleware]

const store = createStore(
  rootReducer,
  apply(
    applyMiddleware,
    createMiddlewares(Number(process.env.REACT_APP_REDUX_DEBUG_MODE))
  ),
)

epicMiddleware.run(rootEpic)

export default store
