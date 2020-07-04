import {
  assoc,
  both,
  equals,
  includes,
  o,
  prop,
  reduce,
} from 'ramda'
import { isNotWhiteCharacter } from './Utils'

// mergeNodeAttributes :: Node -> [String] -> Object
export const mergeNodeAttributes = node => reduce(
  (obj, attr) => assoc(attr, node.getAttribute(attr), obj),
  {},
)

// isNodeType :: Number -> Node ->  Boolean
export const isNodeType = nodeType => o(equals(nodeType), prop('nodeType'))

// isElementNode :: Node -> Boolean
export const isElementNode = isNodeType(1)

// isTextNode :: Node -> Boolean
export const isTextNode = both(
  isNodeType(3),
  o(isNotWhiteCharacter, prop('wholeText')),
)

// hasTagName :: String -> Node -> Boolean
export const hasTagName = tagName => o(equals(tagName), prop('tagName'))

// hasDataAttribute :: String -> Node -> Boolean
export const hasDataAttribute = dataType => node =>
  node.hasAttribute(`data-${dataType}`)

// hasClass :: String -> Node -> Boolean
export const hasClass = className => o(includes(className), prop('classList'))
