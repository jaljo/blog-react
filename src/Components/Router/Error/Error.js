import './Error.css'
import Link from './../Link'
import React from 'react'

// Error :: Props -> React.Component
export default ({
  error,
}) =>
  error &&
  <div data-is="error">
    <h1>{error.httpCode}</h1>
    <p>
      {error.message}
    </p>
    <Link className="btn btn-primary" to={'/'}>
      Back to article list
    </Link>
  </div>
