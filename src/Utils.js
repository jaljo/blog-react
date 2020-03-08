import React from 'react'
import Highlight from 'react-highlight'
import {
  addIndex,
  compose,
  equals,
  map,
  path,
  prop,
} from 'ramda'

export const indexedMap = addIndex(map)

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

// ofType :: String -> Action -> Boolean
export const ofType = actionType => compose(equals(actionType), prop('type'))
