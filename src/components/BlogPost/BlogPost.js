import React from 'react'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser'
import { highlightCodeSnippets } from '../utils'

// BlogPost :: Props -> React.Component
export default ({ post, isLoading }) => isLoading
  ? <div className="loader"></div>
  : <div className="card-body">
      <h2 className="card-title">{ post.title }</h2>
      <h6 className="card-subtitle">{ moment(post.date_creation).format('dddd D MMMM YYYY') }</h6>
      <div className="content">
        { highlightCodeSnippets(ReactHtmlParser(post.content)) }
      </div>
    </div>
