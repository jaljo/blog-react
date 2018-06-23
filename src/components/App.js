import React from 'react'
import { Provider } from 'react-redux'
import DocumentTitle from 'react-document-title'
import Navbar from './NavBar'
import BlogFeed from './BlogFeed'
import Footer from './Footer'
import defaultStore from '../store'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default ({store = defaultStore}) =>
  <Provider store={store}>
    <div className="App">
      <DocumentTitle title="Joris Langlois"/>
      <Navbar/>
      <BlogFeed/>
      <Footer/>
    </div>
  </Provider>
