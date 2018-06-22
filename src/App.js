import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/NavBar.js';
import BlogPost from './components/BlogPost.js';
import Footer from './components/Footer.js';
import SideWidget from './components/SideWidget.js';

const blogPosts = [
  {"id":"1","title":"title","content":"content","date_creation":"2018-06-22 20:25:44"}
]

const App = () =>
  <div className="App">
    <Navbar/>
    <div className="container">
      <div className="row">
        <div className="col-md-8 my-4">
          { blogPosts.map(post => <BlogPost key={ post.id } post={ post }/>)}
        </div>
        <div className="col-md-4">
          <SideWidget/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>

export default App;
