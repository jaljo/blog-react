import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import blogEpic from '../epics/blog'
import blog from './blog'

export const rootEpic = combineEpics(
  blogEpic,
)

export const rootReducer = combineReducers({
  blog,
})
