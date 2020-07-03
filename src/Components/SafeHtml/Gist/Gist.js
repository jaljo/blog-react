import React from 'react'
import './Gist.css'

// Gist :: Props -> React.Component
export default ({
  id,
}) =>
  <iframe
    data-is="gist"
    id={id}
    title={id}
  />
