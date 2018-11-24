import React from 'react'
import Highlight from 'react-highlight'
import shortid from 'shortid'
import { map, equals, path, compose, prop } from 'ramda'

// isHighlighted :: React.Component -> Boolean
const isHighlighted = compose(equals("highlight"), path(['props', 'className']))

// highlightCodeSnippets :: [React.Component] -> [React.Component]
export const highlightCodeSnippets = map(element =>
  <div key={shortid.generate()}>
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
