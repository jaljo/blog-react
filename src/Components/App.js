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
import { Route } from 'react-router-dom'
import React from 'react'
import { default as MyRoute } from './Router/Route'
import Router from './Router/Router'

// App :: () -> React.Component
export default () =>
  <Provider store={Store}>
    <div className="app">
      <Navbar/>
      <div className="main container">
        <div className="row">
          <div className="col-md-8 my-4">
            <Router>
              <MyRoute name="article-details" pattern="^\/article\/([\w-]+)\/?">
                <BlogPost />
              </MyRoute>
              <MyRoute name="article-list" pattern="^\/?">
                <BlogFeed />
              </MyRoute>
            </Router>
            {/*
              <Route exact path='/' component={BlogFeed}/>
              <Route exact path='/article/:seoTitle' component={BlogPost}/>
            */}
          </div>
          <div className="col-md-4">
            <SideWidget/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  </Provider>
