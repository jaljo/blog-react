import React, { Component } from 'react';

class BlogPost extends Component {

  disableAutoescape(rawHtml) {
    return { __html: rawHtml};
  }

  render() {
    var moment = require('moment');

    return (
      <div class="card mb-4">
        {/*<img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap"/>*/}
        <div class="card-body">
          <h2 class="card-title">{ this.props.title }</h2>
          <div dangerouslySetInnerHTML={ this.disableAutoescape(this.props.content) }>
          </div>
          {/*<br/><br/><a href="#" class="btn btn-primary">Read More &rarr;</a>*/}
        </div>
        <div class="card-footer text-muted">
          Posted on { moment(this.props.date).format('dddd D MMMM YYYY') }
        </div>
      </div>
    );
  };
}

export default BlogPost;
