import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/NavBar';
import BlogFeed from './components/BlogFeed/BlogFeed'
import Footer from './components/Footer';

export default () =>
  <div className="App">
    <Navbar/>
    <BlogFeed/>
    <Footer/>
  </div>
