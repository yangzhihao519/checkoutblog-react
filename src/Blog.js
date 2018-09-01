import React, { Component } from 'react';
import './index.css';
import './Blog.css';
import http from 'axios'
import BlogHeader from './BlogHeader'
import BlogPostList from './BlogPostList'
import BlogPostAddForm from './BlogPostAddForm';

class Blog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      showAddForm: false
    }
    this.changeData = this.changeData.bind(this)
    this.getPosts = this.getPosts.bind(this)
    this.addPost = this.addPost.bind(this)
    this.removePost = this.removePost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.handleAddPostClicked = this.handleAddPostClicked.bind(this)
    this.closeAddPostForm = this.closeAddPostForm.bind(this)
  }

  componentDidMount () {
    this.getPosts()
  }

  changeData (newData) {
    this.setState({
      data: newData
    })
  }

  getPosts(){
    http.get('https://cko-dev-test.firebaseio.com/cko/yangzhihao519/posts.json').then(res => {
      var posts = res.data
      var postsArray = []
      for(var key in posts){
        var content = posts[key]
        postsArray.push({id: key, content})
      }
      this.changeData(postsArray)
    })
  }

  addPost(content){
    http.post('https://cko-dev-test.firebaseio.com/cko/yangzhihao519/posts.json', content).then(res => {
      if (res.status === 200) {
        var newPostItemId = res.data.name;
        var updatedPosts = this.state.data.concat([{id: newPostItemId, content}])
        this.changeData(updatedPosts)
      }
    });
  }

  removePost(postId){
    http.delete('https://cko-dev-test.firebaseio.com/cko/yangzhihao519/posts/'+postId+'.json').then(res => {
      if (res.status === 200) {
        var updatedPosts = this.state.data.filter(post => post.id !== postId);
        this.changeData(updatedPosts)
      }
    })
  }

  editPost(postId, content){
    http.patch('https://cko-dev-test.firebaseio.com/cko/yangzhihao519/posts/'+postId+'.json', content).then(res => {
      if (res.status === 200) {
        var editedPost = {id: postId, content}
        var updatedPosts = this.state.data.map(post => (post.id === postId ? Object.assign({}, post, editedPost) : post))
        this.changeData(updatedPosts)
      }
    })
  }

  handleAddPostClicked(){
    this.setState({
      showAddForm: true
    })
  }

  closeAddPostForm(){
    this.setState({
      showAddForm: false
    })
  }

  render() {
    return (
      <div>
        <BlogHeader handleAddPostClicked={this.handleAddPostClicked}/>
        <BlogPostList data={this.state.data} removePost={this.removePost} editPost={this.editPost}/>
        <BlogPostAddForm showAdd={this.state.showAddForm} addPost={this.addPost} closeAddPostForm={this.closeAddPostForm}/>
      </div>
    );
  }
}

export default Blog;