import { combineEpics } from 'redux-observable'
import articles from './articles'
import articleDetails from './articleDetails'

// Epic :: (Observable Action, Observable State, Object) -> Observable Action
export default combineEpics(
    articles,
    articleDetails,
)
