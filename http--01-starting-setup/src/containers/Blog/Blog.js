import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

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
                <li><NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline'
                  }}>POSTS</NavLink></li>
                <li><NavLink to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }}>New Post</NavLink></li>
              </ul>
            </nav>
          </header>
        </div>
        <Switch>
          <Route path="/new-post" component={ NewPost } />
          <Route path="/posts" component={ Posts } />
          <Redirect path="/" to="/posts" />
        </Switch>
      </div>
    );
  }

}

export default Blog;
