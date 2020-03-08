import { combineEpics } from 'redux-observable'
import articles from './articles'

// Epic :: (Observable Action, Observable State, Object) -> Observable Action
export default combineEpics(
    articles,
)
