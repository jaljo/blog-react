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
  BOLD,
  PARAGRAPH,
  TEXT,
  LINK,
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

// Link :: Component -> React.Component
export const Link =({ children, href }, idx) =>
  <ExternalLink to={href} key={idx}>
    {children.map(renderComponent)}
  </ExternalLink>

// Text :: Component -> React.Component
export const Text = prop('content')

// is :: String -> Component -> Boolean
export const is = type => o(equals(type), prop('type'))

// SafeHtml :: Component -> React.Component
export default cond([
  [is(BOLD), Bold],
  [is(LINK), Link],
  [is(PARAGRAPH), Paragraph],
  [is(TEXT), Text],
])
