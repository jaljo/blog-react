import React from 'react'
import { toEnglishDate } from './../../Utils'
import Loader from './../Loader'
import renderComponent from './../SafeHtml'

// BlogPost :: Props -> React.Component
export default ({
  error,
  isLoading,
  article,
}) => isLoading
  ? <Loader />
  : <section>
      {!error
        ? <article className="card-body">
            <h2 className="card-title">
              {article.title}
            </h2>
            <h6 className="card-subtitle">
              {toEnglishDate(article.dateCreation)}
            </h6>
            <div className="content">
              {article.content && article.content.map(renderComponent)}
            </div>
          </article>
        : <p>An error occured. Please retry later.</p>
      }
    </section>
