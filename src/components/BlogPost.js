import React, { Component } from 'react';

class BlogPost extends Component {
  render() {
    return (
      <div class="card mb-4">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap"/>
        <div class="card-body">
          <h2 class="card-title">{ this.props.title }</h2>
          { this.props.content }<br/>
          <br/>
          <a href="#" class="btn btn-primary">Read More &rarr;</a>
        </div>
        <div class="card-footer text-muted">
          Posted on { this.props.date }
        </div>
      </div>
    );
  };
}

export default BlogPost;
