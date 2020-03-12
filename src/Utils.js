import React from 'react'
import Highlight from 'react-highlight'
import {
  addIndex,
  compose,
  equals,
  has,
  map,
  path,
  pipe,
} from 'ramda'

/**
 * Redux utilities
 */

// createReducer :: (State, Object) -> (Maybe State, Object) -> State
export const createReducer = (INITAL_STATE, actions) => (state, action = {}) =>
  has('type', action) && has(action.type, actions)
    ? actions[action.type](state, action)
    : INITAL_STATE

/**
 * Date utilities
 */

// toEnglishDate :: String -> String
export const toEnglishDate = pipe(
  isoDate => new Date(isoDate),
  date => date.toLocaleDateString(
    'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  ),
)

/**
 * Other utils
 */
export const indexedMap = addIndex(map)

// wtf use gists instead of this, to be removed

// isHighlighted :: React.Component -> Boolean
const isHighlighted = compose(equals("highlight"), path(['props', 'className']))

// highlightCodeSnippets :: [React.Component] -> [React.Component]
export const highlightCodeSnippets = indexedMap((element, idx) =>
  <div key={idx}>
    {isHighlighted(element)
      ? <Highlight language="javascript">
          {element.props.children}
        </Highlight>
      : element
    }
  </div>
)
