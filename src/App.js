import React, { Component } from 'react';
import './App.css';

const categories = ['world', 'business', 'tech', 'sport'];
const apiUrl = 'http://localhost:3001'

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
      posts: [],
      filteredPosts: [],
      errors: {}
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    this.fetchPosts();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPolling() {
    this.timeout = setTimeout(() => this.fetchPosts(), 10000);
  }

  fetchPosts() {
    fetch(`${apiUrl}/posts`).then((response) => {
      return response.json();
    }).then((posts) => {
      clearTimeout(this.timeout);
      this.startPolling();
      this.setState({ posts });
    });
  }

  handleNewPost(post) {
    const currentPosts = this.state.posts;
    const context = this;

    var posts = this.state.posts.concat([post]);
    this.setState({ posts, errors: {} });

    fetch(`${apiUrl}/posts`, {
      method: 'post',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json' }
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.errors) {
        context.setState({
          errors: data.errors,
          posts: currentPosts
        });
      } else {
        context.setState({
          errors: {}
        });
      }
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =>
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        <Filter onFilter={this.handleFilter} />
        {filteredPosts.length > 0 ? filteredPosts : posts}
        <PostForm onSubmit={this.handleNewPost} errors={this.state.errors} />
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
    let errors = {};
    Object.keys(this.props.errors).forEach((key) => {
      errors[key] = this.props.errors[key] ? this.props.errors[key][0] : null;
    });
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <small className="error">{errors.category}</small>
            <select ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label>
            Content:
            <small className="error">{errors.content}</small>
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (event.target.value === '') {
      this.props.onFilter('');
    }
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <label>
          <input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." />
        </label>
      </div>
    )
  }
}

export default App;
