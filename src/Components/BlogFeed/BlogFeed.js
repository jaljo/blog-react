import React from 'react'
import { map } from 'ramda'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { highlightCodeSnippets } from '../../Utils'

// BlogFeed :: Props -> React.Component
export default ({
  error,
  isLoading,
  articles,
}) => isLoading
  ? <div className="loader"></div>
  : <section>
      {!error
        ? renderFeed(articles)
        : <p>An error occured. Please retry later.</p>
      }
    </section>

// renderFeed :: [Post] -> React.Component
const renderFeed = map(article =>
  <div key={article.id} className="card mb-4">
    <div className="card-body">
      <h2 className="card-title">
        {article.title}
      </h2>
      <div className="content">
        {highlightCodeSnippets(ReactHtmlParser(article.content))}
      </div>
    </div>
    <Link className="btn btn-primary" to={`/article/${article.seo_title}`}>
      Read →
    </Link>
    <div className="card-footer text-muted">
      Posted on {moment(article.date_creation).format('dddd D MMMM YYYY')}
    </div>
  </div>
)
