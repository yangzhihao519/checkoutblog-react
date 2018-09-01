import React, { Component } from 'react';
import logo from './logo.svg';

class BlogHeader extends Component {
  render() {
    return (
      <div className="blog-header">
        <div className="blog-header--content">
          <img className="blog-header--logo" src={logo} alt="checkout.com"/>
          <div className="flex">
            <div className="blog-header--title">Latest Blog Post</div>
            <button className="blog-header--add-btn pri-btn" onClick={this.props.handleAddPostClicked}>ADD POST</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogHeader;
