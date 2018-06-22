import React from 'react';
import { Component } from 'react';
import BlogPost from '../BlogPost';
import SideWidget from '../SideWidget';

// todo: refactor this to pure functional component
class BlogFeed extends Component {
  render = () =>
    <div className="container">
      <div className="row">
        <div className="col-md-8 my-4">
          { this.props.blog.posts.map(post => <BlogPost key={post.id} post={post}/>) }
        </div>
        <div className="col-md-4">
          <SideWidget/>
        </div>
      </div>
    </div>

  componentDidMount = () => this.props.initPostsLoading()
}
export default BlogFeed
