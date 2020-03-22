import React from 'react'
import Link from './../Router/Link'
import './NavBar.css'

// NavBar :: () -> React.Component
export default () =>
  <header className="fixed-top">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
            <section>
              <span className="navbar-brand">
                <Link to="/">Joris Langlois</Link>
              </span>
            </section>
        </div>
      </div>
    </div>
  </header>
