import { createStore, applyMiddleware } from 'redux'
import { rootReducer, rootEpic } from './modules'
import { createEpicMiddleware } from 'redux-observable';
import { compose } from 'ramda'

const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

if('true' === process.env.REACT_APP_REDUX_DEBUG_MODE) {
  store.subscribe(() =>
    console.log(store.getState())
  )
}

epicMiddleware.run(rootEpic);

export default store
