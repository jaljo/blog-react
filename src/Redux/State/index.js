import { combineReducers } from 'redux'
import articles from './articles'
import articleDetails from './articleDetails'

export default combineReducers({
  articleDetails,
  articles,
})
