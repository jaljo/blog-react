import React from 'react'
import Highlight from 'react-highlight'
import shortid from 'shortid'
import { map, equals } from 'ramda'

// highlightCodeSnippets :: [React.Component] -> [React.Component]
export const highlightCodeSnippets = map(element =>
  <div key={shortid.generate()}>
    {
      equals("highlight", element.props.className)
      ? <Highlight language="javascript">{element.props.children}</Highlight>
      : element
    }
  </div>
)
