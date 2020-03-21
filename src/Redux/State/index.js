import { combineReducers } from 'redux'
import articleDetails from './articleDetails'
import articles from './articles'
import router from './router'

export default combineReducers({
  articleDetails,
  articles,
  router,
})
