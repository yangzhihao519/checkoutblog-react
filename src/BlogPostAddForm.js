import React, { Component } from 'react';

class BlogPostAddForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      imageUrl: '',
      summary: ''
    }
    
    this.titleInputChange = this.titleInputChange.bind(this);
    this.imageUrlInputChange = this.imageUrlInputChange.bind(this);
    this.summaryInputChange = this.summaryInputChange.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  titleInputChange(e){
    this.setState({
      title: e.target.value
    })
  }

  imageUrlInputChange(e){
    this.setState({
      imageUrl: e.target.value
    })
  }

  summaryInputChange(e){
    this.setState({
      summary: e.target.value
    })
  }

  addPost(e){
    e.preventDefault()
    var currentDateTime = new Date();
    const newPost = {
      imageUrl: this.state.imageUrl,
      postDate: currentDateTime.toISOString(),
      summary: this.state.summary,
      title: this.state.title
    }
    
    this.props.addPost(newPost)
    this.props.closeAddPostForm()
  }

  render() {
    var showOrHideAddForm = this.props.showAdd ? "blog-modal__show" : "blog-modal__hide";

    return (
      <div className={"blog-modal "+showOrHideAddForm}>
        <div className="blog-post-form ">
          <div className="blog-post-form--content">
            <form onSubmit={this.addPost}>
              <input className="blog-post-form--content--input" type="text" value={this.state.title} placeholder="Enter post title" onChange={this.titleInputChange} />
              <input className="blog-post-form--content--input" type="url" value={this.state.imageUrl} placeholder="Post image URL" onChange={this.imageUrlInputChange} />
              <textarea className="blog-post-form--content--input" type="text" rows="3" style={{height: 100+"px"}} value={this.state.summary} placeholder="Enter summary" onChange={this.summaryInputChange} /> 
              <input className="pri-btn" type="submit" value="Sumit" />
            </form>
          </div>
          <div className="blog-post-form--close" onClick={this.props.closeAddPostForm}>Close</div>
        </div>
      </div>
    );
  }
}

export default BlogPostAddForm;
