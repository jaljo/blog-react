import React, { Component } from 'react';
import moment from 'moment'

export default ({post}) =>
  <div className="card mb-4">
  { console.error(post) }
    <div className="card-body">
      <h2 className="card-title">{ post.title }</h2>
      <div dangerouslySetInnerHTML={ disableAutoescape(post.content) }>
      </div>
    </div>
    <div className="card-footer text-muted">
      Posted on { moment(post.date_creation).format('dddd D MMMM YYYY') }
    </div>
  </div>

const disableAutoescape = rawHtml => ({ __html: rawHtml})
