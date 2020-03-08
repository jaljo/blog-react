import React from 'react'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { highlightCodeSnippets } from '../../Utils'

// BlogPost :: Props -> React.Component
export default ({
  error,
  isLoading,
  post,
}) => isLoading
  ? <div className="loader"></div>
  : <section>
      {!error
        ? <article className="card-body">
            <h2 className="card-title">
              {post.title}
            </h2>
            <h6 className="card-subtitle">
              {moment(post.date_creation).format('dddd D MMMM YYYY')}
            </h6>
            <div className="content">
              {highlightCodeSnippets(ReactHtmlParser(post.content))}
            </div>
          </article>
        : <p>An error occured. Please retry later.</p>
      }
    </section>
