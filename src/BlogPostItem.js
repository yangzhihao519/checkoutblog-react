import React, { Component } from 'react';

class BlogPostItem extends Component {
  constructor (props) {
    super(props)
    this.remove = this.remove.bind(this)
    this.edit = this.edit.bind(this)
  }

  remove(){
    this.props.removePost(this.props.id)
  }

  edit(){
    this.props.handleEditFormClicked(this.props.id, this.props.post)
  }

  render() {
    const { title, imageUrl, summary, postDate } = this.props.post
    var dateToBeFormatted = new Date(postDate)
    var dateFormatRule = { year: 'numeric', month: 'long', day: 'numeric' }
    var formattedPostDate = dateToBeFormatted.toLocaleDateString('en-UK', dateFormatRule)
    return (
      <div className="blog-post-item">
          <div className="blog-post-item--image-container">
            <img className="blog-post-item--image" src={imageUrl} role="presentation" alt={title}/>
          </div>
          <div className="blog-post-item--content">
            <div className="blog-post-item--content--actions">
              <button className="blog-post-item--content--action-btn" type="button" onClick={this.edit}>Edit</button>
              <button className="blog-post-item--content--action-btn" type="button" onClick={this.remove}>Delete</button>
            </div>
            <div className="blog-post-item--content--post-date">{formattedPostDate}</div>
            <div className="blog-post-item--content--title">{title}</div>
            <div className="blog-post-item--content--summary">{summary}</div>
          </div>
      </div>
    );
  }
}

export default BlogPostItem;
