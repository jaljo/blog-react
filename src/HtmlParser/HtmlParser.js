import {
  T,
  __,
  always,
  assoc,
  both,
  complement,
  cond,
  either,
  equals,
  includes,
  isNil,
  map,
  o,
  pipe,
  prop,
  reduce,
  reject,
  tap,
} from 'ramda'

// supported types
export const PARAGRAPH = '@type/PARAGRAPH'
export const BOLD = '@type/BOLD'
export const TEXT = '@type/TEXT'
export const LINK = '@type/LINK'

/**
 * @type Node
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Node
 */

/**
 * @type Document
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Document
 */

/**
 * @type Component = {
 *    type :: String
 *    children: [Component]
 *    content: Maybe String
 * }
 */

// mergeNodeAttributes :: Node -> [String] -> Object
export const mergeNodeAttributes = node => reduce(
  (obj, attr) => assoc(attr, node.getAttribute(attr), obj),
  {},
)

 // createComponent :: (String, [String]) -> Node -> Component
export const createComponent = (type, attributes = []) => node => ({
  type,
  children: node.childNodes
    ? nodeListToComponents(node.childNodes)
    : []
  ,
  content: node.wholeText
    ? node.wholeText
    : null
  ,
  ...mergeNodeAttributes(node)(attributes),
})

// isNodeType :: Number -> Node ->  Boolean
export const isNodeType = nodeType => o(equals(nodeType), prop('nodeType'))

// isElementNode :: Node -> Boolean
export const isElementNode = isNodeType(1)

// isNotWhiteCharacter :: String -> Boolean
export const isNotWhiteCharacter = complement(includes(__, ['\n']))

// isTextNode :: Node -> Boolean
export const isTextNode = both(
  isNodeType(3),
  o(isNotWhiteCharacter, prop('wholeText')),
)

// hasTagName :: String -> Node -> Boolean
export const hasTagName = tagName => o(equals(tagName), prop('tagName'))

// isParagraph :: Node -> Boolean
export const isParagraph = both(isElementNode, hasTagName('P'))

// isBold :: Node -> Boolean
export const isBold = both(
  isElementNode,
  either(hasTagName('B'), hasTagName('STRONG'))
)

// isLink :: Node -> Boolean
export const isLink = both(
  isElementNode,
  hasTagName('A'),
)

// createText :: Node -> Component
export const createText = createComponent(TEXT)

// createParagraph :: Node -> Component
export const createParagraph = createComponent(PARAGRAPH)

// createBold :: Node -> Component
export const createBold = createComponent(BOLD)

// createLink :: Node -> Component
export const createLink = createComponent(LINK, ['href'])

// nodeToComponent :: Node -> Component
const nodeToComponent = cond([
  [isBold, createBold],
  [isLink, createLink],
  [isParagraph, createParagraph],
  [isTextNode, createText],
  [T, always(null)],
])

// nodeListToComponents :: [Node] -> [Component]
const nodeListToComponents = pipe(
  map(nodeToComponent),
  reject(isNil),
)

// HtmlParser :: Document -> String -> [Component]
export default document => pipe(
  // create a div element to inject the raw HTML in
  html => [document.createElement('div'), html],
  // build a tree from that HTML
  tap(([ div, html ]) => div.innerHTML = html),
  // transform node trees to safe components
  ([ tree ]) => nodeListToComponents(tree.childNodes),
)
