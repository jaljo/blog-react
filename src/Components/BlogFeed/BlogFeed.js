import React from 'react'
import { map } from 'ramda'
import { Link } from 'react-router-dom'
import { toEnglishDate } from './../../Utils'
import Loader from './../Loader'
import renderComponent from './../SafeHtml'

// BlogFeed :: Props -> React.Component
export default ({
  error,
  isLoading,
  articles,
}) => isLoading
  ? <Loader />
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
        {article.content && article.content.map(renderComponent)}
      </div>
    </div>
    <Link className="btn btn-primary" to={`/article/${article.slug}`}>
      Read →
    </Link>
    <div className="card-footer text-muted">
      Posted on {toEnglishDate(article.dateCreation)}.
    </div>
  </div>
)
