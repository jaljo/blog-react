import React, { Component } from 'react';

class SideWidget extends Component {
  render() {
    return (
      <div class="card my-4">
        <h5 class="card-header">About me</h5>
        <div class="card-body">
         <p>
           I'm a french developper interested in coding cool stuff, mathematics and eating tons of cheese.<br/>
           <br/>
           This minimal blog is an attempt to share my daily understandings, and a pretty good excuse to improve my english :)
         </p>
        </div>
      </div>
    );
  }
}

export default SideWidget;
