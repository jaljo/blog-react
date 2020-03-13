import {
  both,
  cond,
  either,
  equals,
  map,
  o,
  pipe,
  prop,
  tap,
} from 'ramda'

/*
 * @type Node
 * @see https://developer.mozilla.org/fr/docs/Web/API/Node
 */

 // createComponent :: String -> Node -> Component
const createComponent = type => node => ({
  type,
  children: node.childNodes ? nodeListToComponents(node.childNodes) : [],
  content: node.wholeText ? node.wholeText : null,
})

// isNodeType :: Number -> Node ->  Boolean
const isNodeType = nodeType => o(equals(nodeType), prop('nodeType'))

// isElementNode :: Node -> Boolean
const isElementNode = isNodeType(1)

// isTextNode :: Node -> Boolean
const isTextNode = isNodeType(3)

// hasTagName :: String -> Node -> Boolean
const hasTagName = tagName => o(equals(tagName), prop('tagName'))

// isParagraph :: Node -> Boolean
const isParagraph = both(isElementNode, hasTagName('P'))

// createParagraph :: Node -> Component
const createParagraph = createComponent('PARAGRAPH')

// createText :: Node -> Component
const createText = createComponent('TEXT')

// isBold :: Node -> Boolean
const isBold = both(
  isElementNode,
  either(hasTagName('B'), hasTagName('STRONG'))
)

// createBold :: Node -> Component
const createBold = createComponent('BOLD')

// nodeToComponent :: Node -> Component
const nodeToComponent = cond([
  [isBold, createBold],
  [isParagraph, createParagraph],
  [isTextNode, createText],
])

// nodeListToComponents :: [Node] -> [Component]
const nodeListToComponents = map(nodeToComponent)

// HtmlParser :: Document -> String -> [Component]
export default document => pipe(
  // create a div element to inject the raw HTML in
  html => [document.createElement('div'), html],
  // build a tree from that HTML
  tap(([ div, html ]) => div.innerHTML = html),
  // transform node trees to safe components
  ([ tree ]) => nodeListToComponents(tree.childNodes),
)
