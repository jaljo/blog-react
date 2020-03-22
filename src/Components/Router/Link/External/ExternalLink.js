import React from 'react'

// ExternalLink :: Props -> React.Component
export default ({
  to,
  children,
}) =>
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
