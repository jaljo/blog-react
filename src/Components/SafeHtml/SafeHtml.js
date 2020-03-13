import React from 'react'
import renderComponent from './SafeHtml'
import {
  cond,
  equals,
  o,
  prop,
} from 'ramda'

// Pargraph :: Component -> React.Component
const Pargraph = ({ children }, idx) =>
  <p key={idx}>
    {children.map(renderComponent)}
  </p>

// Bold :: Component -> React.Component
const Bold = ({ children }, idx) =>
  <b key={idx}>
    {children.map(renderComponent)}
  </b>

// Text :: Component -> React.Component
const Text = prop('content')

// is :: String -> Component -> Boolean
const is = type => o(equals(type), prop('type'))

// SafeHtml :: Component -> React.Component
export default cond([
  [is('PARAGRAPH'), Pargraph],
  [is('TEXT'), Text],
  [is('BOLD'), Bold],
])
