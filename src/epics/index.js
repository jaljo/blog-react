import { combineEpics } from 'redux-observable'
import blog from './blog'

// Epic :: (Observable Action, Observable State, Object) -> Observable Action
export default combineEpics(
    blog,
)
