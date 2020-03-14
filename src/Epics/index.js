import { combineEpics } from 'redux-observable'
import articles from './articles'
import articleDetails from './articleDetails'
import router from './router'

// Epic :: (Observable Action, Observable State, Object) -> Observable Action
export default combineEpics(
  articleDetails,
  articles,
  router,
)
