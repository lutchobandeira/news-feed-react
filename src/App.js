import React, { Component } from 'react';
import './App.css';

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
        {content: 'This is my first post!'},
        {content: 'This is my second post!'}
      ]
    }
  }
  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        {posts}
      </div>
    )
  }
}

class Post extends Component {
  render() {
    return (
      <div className="post">
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
}

export default App;