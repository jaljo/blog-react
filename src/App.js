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

  constructor(props) {
    super(props);
    this.state = {blogPosts: []};
  }

  // fetch blog posts from server
  // TODO: replace test url by prod url
  componentDidMount() {
    fetch('http://localhost/blog-react/tmp/api.php')
      .then(response => response.json())
      .then(fetchedBlogPosts => this.setState({ blogPosts: fetchedBlogPosts }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">

          <Navbar/>

          <div class="container">
            <div class="row">

              {/* main container */}
              <div class="col-md-8">
                <Header/>
                { this.state.blogPosts.map(post => <BlogPost key={ post.id } title={ post.title } content={ post.content } date={ post.date }/>)}
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
