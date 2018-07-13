import React from 'react'
import { map } from 'ramda'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'

// BlogFeed :: Props -> React.Component
export default ({ posts, isLoading }) => isLoading
  ? <div className="loader"></div>
  : renderFeed(posts)

// renderFeed :: [Post] -> React.Component
const renderFeed = map(post =>
  <div key={post.id} className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">{ post.title }</h2>
      <div className="content">
        { ReactHtmlParser(post.content) }
      </div>
    </div>
    <Link className="btn btn-primary" to={`/article/${post.seo_title}`}>Read →</Link>
    <div className="card-footer text-muted">
      Posted on { moment(post.date_creation).format('dddd D MMMM YYYY') }
    </div>
  </div>
)
