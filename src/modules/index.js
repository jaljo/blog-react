import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import loadBlogPostEpic from '../epics/blog'
import blog from './blog'

export const rootEpic = combineEpics(
  loadBlogPostEpic,
)

export const rootReducer = combineReducers({
  blog,
})
