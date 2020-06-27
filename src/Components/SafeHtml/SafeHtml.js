import React from 'react'
import renderComponent from './SafeHtml'
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
  ITALIC,
  LINK,
  PARAGRAPH,
  TEXT,
} from './../../HtmlParser/HtmlParser'

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
export const Blockquote = ({ children, idx }) =>
  <blockquote key={idx} >
    {children.map(renderComponent)}
  </blockquote>

// Text :: Component -> React.Component
export const Text = prop('content')

// is :: String -> Component -> Boolean
export const is = type => o(equals(type), prop('type'))

// SafeHtml :: Component -> React.Component
export default cond([
  [is(ITALIC), Italic],
  [is(BOLD), Bold],
  [is(LINK), Link],
  [is(PARAGRAPH), Paragraph],
  [is(BLOCKQUOTE), Blockquote],
  [is(TEXT), Text],
])
