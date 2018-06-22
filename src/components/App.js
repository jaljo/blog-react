import React from 'react';
import { Provider } from 'react-redux'
import Navbar from './NavBar';
import BlogFeed from './BlogFeed'
import Footer from './Footer';
import defaultStore from '../store'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// todo: avoid calling store as a function
export default ({store = defaultStore}) =>
  <Provider store={store()}>
    <div className="App">
      <Navbar/>
      <BlogFeed/>
      <Footer/>
    </div>
  </Provider>
