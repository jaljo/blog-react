import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/NavBar.js';
import BlogPost from './components/BlogPost.js';
import Pagination from './components/Pagination.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import SideWidget from './components/SideWidget.js';
import CategoriesWidget from './components/CategoriesWidget.js';
import SearchWidget from './components/SearchWidget.js';

class App extends Component {
  render() {
    return (
      <div className="App">

          <Navbar/>

          <div class="container">
            <div class="row">

              {/* main container */}
              <div class="col-md-8">
                <Header/>
                <BlogPost title="titre 1"/>
                <BlogPost title="titre 2"/>
                <BlogPost title="titre 3"/>
                <Pagination/>
              </div>
              {/* end main container */}

              {/* side widgets container */}
              <div class="col-md-4">
                <SearchWidget/>
                <CategoriesWidget/>
                <SideWidget/>
              </div>
              {/* end side widgets container */}

            </div>
          </div>

          <Footer/>
          
      </div>
    );
  }
}

export default App;
