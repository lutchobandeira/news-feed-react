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
        <div className="post">
          <span>This is my first post!</span>
        </div>
      </div>
    )
  }
}

export default App;
