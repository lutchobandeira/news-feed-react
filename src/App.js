import React, { Component } from 'react';
import './App.css';

const categories = ['World', 'Business', 'Tech', 'Sport'];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: 'This is my first post!'},
        {category: categories[1], content: 'This is my second post!'}
      ]
    }

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
}

class Post extends Component {
  render() {
    return (
      <div className="post">
        <span className="label">{this.props.value.category}</span>
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
}

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = '';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label>
            Content:
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
}

export default App;
