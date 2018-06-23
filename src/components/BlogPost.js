import React from 'react'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'

export default ({post}) =>
  <div className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">{ post.title }</h2>
      <div className="content">
        { ReactHtmlParser(post.content) }
      </div>
    </div>
    <div className="card-footer text-muted">
      Posted on { moment(post.date_creation).format('dddd D MMMM YYYY') }
    </div>
  </div>
