import { createStore } from 'redux'
import { reducer as blogPostsReducer } from './modules/BlogPost/BlogPost'

const defaultStore = createStore(blogPostsReducer)

defaultStore.subscribe(() =>
  console.log(defaultStore.getState())
)

export default defaultStore;
