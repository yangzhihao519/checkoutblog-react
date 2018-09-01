import React, { Component } from 'react';
import BlogPostItem from './BlogPostItem'
import BlogPostEditForm from './BlogPostEditForm'

class BlogPostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false,
      editPostId: '',
      editPostBody: ''
    }
    this.handleEditFormClicked = this.handleEditFormClicked.bind(this)
    this.closeEditForm = this.closeEditForm.bind(this)
  }

  handleEditFormClicked(postId, post){
    this.setState({
      showEdit: true,
      editPostId: postId,
      editPostBody: post
    })
  }

  closeEditForm(){
    this.setState({
      showEdit: false,
      editPostId: '',
      editPostBody: ''
    })
  }

  render() {
    var sortedPosts = this.props.data.sort((a,b) => {
      var aPostDate = a.content ? new Date(a.content.postDate).getTime() : 0;
      var bPostDate = b.content ? new Date(b.content.postDate).getTime() : 0;
      return aPostDate - bPostDate;
    }).reverse();
    var postItems = sortedPosts.map(post => {
      return <BlogPostItem key={post.id} 
                           id={post.id} 
                           post={post.content} 
                           removePost={this.props.removePost} 
                           handleEditFormClicked={this.handleEditFormClicked}/>})
    
    return <div className="blog-content">
        <div className="blog-post-list">
          {postItems}
        </div>
        <BlogPostEditForm showEdit={this.state.showEdit} editPostId={this.state.editPostId} editPostBody={this.state.editPostBody} editPostAction={this.props.editPost} closeEidtForm={this.closeEditForm}/>
      </div>;
  }
}

export default BlogPostList;