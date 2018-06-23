import { createStore, applyMiddleware } from 'redux'
import { rootReducer, rootEpic } from './modules'
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

// todo: avoid exporting a function
export default function configureStore() {
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

  return store;
}
