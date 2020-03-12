import React from 'react'
import { Link } from 'react-router-dom'

// NavBar :: () -> React.Component
export default () =>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <span className="navbar-brand">
        <Link to="/">Joris Langlois</Link>
      </span>
    </div>
  </nav>
