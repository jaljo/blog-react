import React from 'react'

// Link :: Props -> React.Component
export default ({
  changeRoute,
  children,
  className,
  to,
}) =>
  <a
    className={className}
    onClick={() => changeRoute(to)}
  >
    {children}
  </a>
