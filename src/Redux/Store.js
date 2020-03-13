import { createStore, applyMiddleware } from 'redux'
import rootReducer from './State'
import rootEpic from './../Epics'
import { createEpicMiddleware } from 'redux-observable'
import { apply, pipe, tap } from 'ramda'
import createFetchApi from './../FetchApi'
import createParser from './../HtmlParser/HtmlParser'

const logger = store => next => pipe(
  tap(action => console.log('Action :: ', action)),
  next,
  tap(() => console.log('State ::', store.getState())),
)

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    fetchApi: createFetchApi(fetch, process.env.REACT_APP_API),
    parser: createParser(document),
  }
})

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
