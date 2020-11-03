import React, { Component } from 'react';
import './Blog.css';

import Posts from './Posts/Posts'

class Blog extends Component {

  render () {
    return (
      <div>
        <div className="Blog">
          <header>
            <nav>
              <ul>
                <li><a href="/">HOME</a></li>
                <li><a href="/new-post">New Post</a></li>
              </ul>
            </nav>
          </header>
        </div>
        <Posts />
      </div>
    );
  }
}

export default Blog;
