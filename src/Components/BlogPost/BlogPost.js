import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { highlightCodeSnippets } from '../../Utils'
import { toEnglishDate } from './../../Utils'

// BlogPost :: Props -> React.Component
export default ({
  error,
  isLoading,
  article,
}) => isLoading
  ? <div className="loader"></div>
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
              {highlightCodeSnippets(ReactHtmlParser(article.content))}
            </div>
          </article>
        : <p>An error occured. Please retry later.</p>
      }
    </section>
