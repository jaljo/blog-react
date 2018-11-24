import React from 'react'
import Highlight from 'react-highlight'
import shortid from 'shortid'
import { map, equals, path, compose } from 'ramda'

// highlightCodeSnippets :: [React.Component] -> [React.Component]
export const highlightCodeSnippets = map(element =>
  <div key={shortid.generate()}>
    {isHighlighted(element)
      ? <Highlight language="javascript">{element.props.children}</Highlight>
      : element
    }
  </div>
)

// isHighlighted :: React.Component -> Boolean
const isHighlighted = compose(equals("highlight"), path(['props', 'className']))
