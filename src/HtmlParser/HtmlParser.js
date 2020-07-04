import {
  T,
  __,
  allPass,
  always,
  both,
  cond,
  either,
  isNil,
  map,
  pipe,
  reject,
  tap,
} from 'ramda'
import {
  hasClass,
  hasDataAttribute,
  hasTagName,
  isElementNode,
  isTextNode,
  mergeNodeAttributes,
} from './../DomUtils'

// supported types
export const BLOCKQUOTE = '@type/BLOCKQUOTE'
export const BOLD = '@type/BOLD'
export const FIGURE = '@type/FIGURE'
export const GIT_GIST = '@type/GIT_GIST'
export const INLINE_CODE = '@type/INLINE_CODE'
export const ITALIC = '@type/ITALIC'
export const LINK = '@type/LINK'
export const LIST = '@type/LIST'
export const LIST_ITEM = '@type/LIST_ITEM'
export const PARAGRAPH = '@type/PARAGRAPH'
export const TEXT = '@type/TEXT'

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

// createText :: Node -> Component
export const createText = createComponent(TEXT)

// isParagraph :: Node -> Boolean
export const isParagraph = both(isElementNode, hasTagName('P'))

// createParagraph :: Node -> Component
export const createParagraph = createComponent(PARAGRAPH)

// isBold :: Node -> Boolean
export const isBold = both(
  isElementNode,
  either(hasTagName('B'), hasTagName('STRONG'))
)

// createBold :: Node -> Component
export const createBold = createComponent(BOLD)

// isItalic :: Node -> Boolean
export const isItalic = both(
  isElementNode,
  either(hasTagName('I'), hasTagName('EM'))
)

// createItalic :: Node -> Component
export const createItalic = createComponent(ITALIC)

// isLink :: Node -> Boolean
export const isLink = both(
  isElementNode,
  hasTagName('A'),
)

// createLink :: Node -> Component
export const createLink = createComponent(LINK, ['href'])

// isBlockquote :: Node -> Boolean
export const isBlockquote = both(
  isElementNode,
  hasTagName('BLOCKQUOTE'),
)

// createLink :: Node -> Component
export const createBlockquote = createComponent(BLOCKQUOTE)

// isGist :: Node -> Boolean
export const isGist = allPass([
  isElementNode,
  hasTagName('DIV'),
  hasDataAttribute('src'),
])

// createGist :: Node -> Component
export const createGist = createComponent(GIT_GIST, ['data-src'])

// isInlineCode :: Node -> Boolean
export const isInlineCode = allPass([
  isElementNode,
  hasTagName('SPAN'),
  hasClass('code'),
])

// createInlineCode :: Node -> Component
export const createInlineCode = createComponent(INLINE_CODE)

// isList :: Node -> Boolean
export const isList = both(isElementNode, hasTagName('UL'))

// createList :: Node -> Component
export const createList = createComponent(LIST)

// isListItem :: Node -> Boolean
export const isListItem = both(isElementNode, hasTagName('LI'))

// createListItem :: Node -> Component
export const createListItem = createComponent(LIST_ITEM)

// isFigure :: Node -> Boolean
export const isFigure = both(isElementNode, hasTagName('FIGURE'))

// createFigure :: Node -> Component
export const createFigure = node => ({
  type: FIGURE,
  image: node.querySelector('img').getAttribute('src'),
  caption:  node.querySelector('figcaption').innerText,
})

// nodeToComponent :: Node -> Component
const nodeToComponent = cond([
  [isBlockquote, createBlockquote],
  [isBold, createBold],
  [isFigure, createFigure],
  [isGist, createGist],
  [isInlineCode, createInlineCode],
  [isItalic, createItalic],
  [isLink, createLink],
  [isList, createList],
  [isListItem, createListItem],
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
