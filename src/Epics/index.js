import { combineEpics } from 'redux-observable'
import articleDetails from './articleDetails'
import articles from './articles'
import gists from './gists'
import router from './router'

// Epic :: (Observable Action, Observable State, Object) -> Observable Action
export default combineEpics(
  articleDetails,
  articles,
  router,
  gists
)
