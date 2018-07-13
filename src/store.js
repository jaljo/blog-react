import { createStore, applyMiddleware } from 'redux'
import { rootReducer, rootEpic } from './modules'
import { createEpicMiddleware } from 'redux-observable'

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware),
  applyMiddleware(logger),
)

epicMiddleware.run(rootEpic)

export default store
