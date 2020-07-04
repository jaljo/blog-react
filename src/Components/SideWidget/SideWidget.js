import React from 'react'
import './SideWidget.css'
import Link from './../Router/Link/External'

// SideWidget :: () -> React.Component
export default () =>
  <div data-is="side-widget" className="about card my-4">
    <div className="sticky-container">
      <div className="about">
        <h5 className="card-header">About me</h5>
        <div className="card-body">
          <p>
            I'm a french developer interested in coding cool stuff,
            mathematics and eating tons of cheese.<br/>
          </p>
          <p>
            Have a look to this blog codebase&nbsp;
            <Link to="https://github.com/jaljo/blog-react">here</Link> and&nbsp;
            <Link to="https://github.com/jaljo/blog-api">here</Link>.
          </p>
        </div>
      </div>

      <div className="early-lives">
        <h5 className="card-header">Early lives</h5>
        <div className="card-body">
          <p>
            Before being a developer, I put a pretty decent amount of efforts in
            learning drawing and animation. It's in the past now, but if you
            feel curious, just check it out:
          </p>
          <p>
            <ul>
              <li>
                <Link to="https://langlois-joris.blogspot.com/">
                  2D animation course
                  (2011 - 2012)
                </Link>
              </li>
              <li>
                <Link to="https://joris-langlois.blogspot.com/">
                  Pre-animation course
                  (2009 - 2011)
                </Link>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
