import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import defaultStore from '../store'
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'
import DocumentTitle from 'react-document-title'
import Footer from './Footer'
import Navbar from './NavBar'
import SideWidget from './SideWidget/SideWidget'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import React from 'react'

// App :: Props -> React.Component
export default ({store = defaultStore}) =>
  <Provider store={store}>
    <div className="app">
      <DocumentTitle title="Joris Langlois"/>
      <Navbar/>
      <div className="main container">
        <div className="row">
          <div className="col-md-8 my-4">
            <Route exact path='/' component={BlogFeed}/>
            <Route exact path='/article/:seoTitle' component={BlogPost}/>
          </div>
          <div className="col-md-4">
            <SideWidget/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </Provider>
