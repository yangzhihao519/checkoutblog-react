import React, { Component } from 'react';

class BlogPostEditForm extends Component {
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
    this.savePost = this.savePost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.editPostBody.title,
      imageUrl: nextProps.editPostBody.imageUrl,
      summary: nextProps.editPostBody.summary,
    })
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

  savePost(e){
    e.preventDefault()
    const editedPost = {
      imageUrl: this.state.imageUrl,
      postDate: this.props.editPostBody.postDate,
      summary: this.state.summary,
      title: this.state.title
    }
    this.props.editPostAction(this.props.editPostId, editedPost)
    this.props.closeEidtForm()
  }

  render() {
    var showOrHideEditForm = this.props.showEdit ? "blog-modal__show" : "blog-modal__hide";

    return (
      <div className={"blog-modal "+showOrHideEditForm}>
        <div className="blog-post-form">
          <div className="blog-post-form--content">
            <form onSubmit={this.savePost}>
              <input className="blog-post-form--content--input" type="text" value={this.state.title || ''} placeholder="Enter post title" onChange={this.titleInputChange} />
              <input className="blog-post-form--content--input" type="url" value={this.state.imageUrl || ''} placeholder="Post image URL" onChange={this.imageUrlInputChange} />
              <textarea  className="blog-post-form--content--input" type="text" rows="3" style={{height: 100+"px"}} value={this.state.summary || ''} placeholder="Enter summary" onChange={this.summaryInputChange} /> 
              <input className="pri-btn" type="submit" value="Save" />
            </form>
          </div>
          <div className="blog-post-form--close" onClick={this.props.closeEidtForm}>Close</div>
        </div>
      </div>
    );
  }
}

export default BlogPostEditForm;
