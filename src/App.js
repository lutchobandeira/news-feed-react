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
  render() {
    return (
      <div className="feed">
        <Post content="This is my first post!" />
        <Post content="This is my second post!" />
      </div>
    )
  }
}

class Post extends Component {
  render() {
    return (
      <div className="post">
        <span>{this.props.content}</span>
      </div>
    )
  }
}

export default App;
