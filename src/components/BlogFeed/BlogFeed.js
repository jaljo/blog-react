import React from 'react';
import BlogPost from '../BlogPost';
import SideWidget from '../SideWidget/SideWidget';

export default ({ blog }) =>
  <div className="container">
    <div className="row">
      <div className="col-md-8 my-4">
        { blog.isLoading
          ? <div className="loader"></div>
          : blog.posts.map(post => <BlogPost key={post.id} post={post}/>)
        }
      </div>
      <div className="col-md-4">
        <SideWidget/>
      </div>
    </div>
  </div>
