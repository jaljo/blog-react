import React from 'react'
import './SideWidget.css'
import Link from './../Router/Link/External'

// SideWidget :: () -> React.Component
export default () =>
  <div data-is="side-widget" className="about card my-4">
    <h5 className="card-header">About me</h5>
    <div className="card-body">
     <p>
       I'm a french developper interested in coding cool stuff,
       mathematics and eating tons of cheese.<br/>
       <br/>
       This minimal blog is an attempt to share my daily understandings,
       and a pretty good excuse to improve my english :)
     </p>
     <p>
       Have a look to this blog codebase&nbsp;
       <Link to="https://github.com/jaljo/blog-react">here</Link> and&nbsp;
       <Link to="https://github.com/jaljo/blog-api">here</Link>.
     </p>
    </div>
  </div>
