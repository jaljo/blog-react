import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import blogPostEpic from '../epics/blogpost'
import blog from './blog'

export const rootEpic = combineEpics(
  blogPostEpic,
)

export const rootReducer = combineReducers({
  blog,
})
