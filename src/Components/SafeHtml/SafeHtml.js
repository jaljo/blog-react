import React from 'react'
import renderComponent from './SafeHtml'
import CreateGist from './Gist'
import ExternalLink from './../Router/Link/External'
import {
  cond,
  equals,
  o,
  prop,
} from 'ramda'
import {
  BLOCKQUOTE,
  BOLD,
  GIT_GIST,
  INLINE_CODE,
  ITALIC,
  LINK,
  LIST,
  LIST_ITEM,
  PARAGRAPH,
  TEXT,
  FIGURE,
} from './../../HtmlParser/HtmlParser'
import './SafeHtml.css'

// Text :: Component -> React.Component
export const Text = prop('content')

// Paragraph :: Component -> React.Component
export const Paragraph = ({ children }, idx) =>
  <p key={idx}>
    {children.map(renderComponent)}
  </p>

// Bold :: Component -> React.Component
export const Bold = ({ children }, idx) =>
  <b key={idx}>
    {children.map(renderComponent)}
  </b>

// Italic :: Component -> React.Component
export const Italic = ({ children }, idx) =>
  <i key={idx}>
    {children.map(renderComponent)}
  </i>

// Link :: Component -> React.Component
export const Link = ({ children, href }, idx) =>
  <ExternalLink to={href} key={idx}>
    {children.map(renderComponent)}
  </ExternalLink>

// Blockquote :: Component -> React.Component
export const Blockquote = ({ children }, idx) =>
  <blockquote key={idx} >
    {children.map(renderComponent)}
  </blockquote>

// Gist :: Component -> React.Component
export const Gist = (component, idx) =>
  <CreateGist
    key={idx}
    url={component['data-src']}
  />

// InlineCode :: Component -> React.Component
export const InlineCode = ({ children }, idx) =>
  <span key={idx} className="code">
    {children.map(renderComponent)}
  </span>

// List :: Component -> React.Component
export const List = ({ children }, idx) =>
  <ul key={idx}>
    {children.map(renderComponent)}
  </ul>

// ListItem :: Component -> React.Component
export const ListItem = ({ children }, idx) =>
  <li key={idx}>
    {children.map(renderComponent)}
  </li>

// Figure :: Component -> React.Component
export const Figure = ({ image, caption }, key) =>
  <figure key={key} data-is="image-with-caption">
    <img src={image} alt="" />
    <figcaption>
      {caption}
    </figcaption>
  </figure>

// is :: String -> Component -> Boolean
export const is = type => o(equals(type), prop('type'))

// SafeHtml :: Component -> React.Component
export default cond([
  [is(BLOCKQUOTE), Blockquote],
  [is(BOLD), Bold],
  [is(FIGURE), Figure],
  [is(GIT_GIST), Gist],
  [is(INLINE_CODE), InlineCode],
  [is(ITALIC), Italic],
  [is(LINK), Link],
  [is(LIST), List],
  [is(LIST_ITEM), ListItem],
  [is(PARAGRAPH), Paragraph],
  [is(TEXT), Text],
])
