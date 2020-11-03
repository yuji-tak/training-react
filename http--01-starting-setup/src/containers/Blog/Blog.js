import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost';

class Blog extends Component {

  render () {
    return (
      <div>
        <div className="Blog">
          <header>
            <nav>
              <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }}>New Post</Link></li>
              </ul>
            </nav>
          </header>
        </div>
        <Route path="/" exact component={ Posts } />
        <Route path="/new-post" component={ NewPost } />
      </div>
    );
  }

}

export default Blog;
