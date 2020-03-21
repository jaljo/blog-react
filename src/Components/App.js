// wtf wtf wtf
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Store from './../Redux/Store'
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'
import Footer from './Footer'
import Navbar from './NavBar'
import SideWidget from './SideWidget/SideWidget'
import { Provider } from 'react-redux'
import React from 'react'
import Route from './Router/Route'
import Router from './Router/Router'
import Error from './Router/Error'

// App :: () -> React.Component
export default () =>
  <Provider store={Store}>
    <div className="app">
      <Navbar/>
      <div className="main container">
        <div className="row">
          <div className="col-md-8 my-4">
            <Router>
              <Route name="article-details" pattern="^\/article\/([\w-]+)\/?$" parameters={['slug']}>
                <BlogPost />
              </Route>
              <Route name="article-list" pattern="^\/?$">
                <BlogFeed />
              </Route>
              <Error />
            </Router>
          </div>
          <div className="col-md-4">
            <SideWidget/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </Provider>
