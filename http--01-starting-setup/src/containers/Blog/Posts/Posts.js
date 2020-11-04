import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

  state = {
    posts: [],
  }

  componentDidMount() {
    axios.get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
            ...post,
            author: 'Yuji'
          }
        });
        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        console.log(error)
      });
  }

  postSelectedHandler = (id) => {
    // this.props.history.push({ pathname: '/posts/' + id });
    this.props.history.push('/posts/' + id);
  }

  render () {

    let posts = <p style={{ textAlign: "center" }}>Something went wrong!!!</p>

    if (!this.state.error) {
      // postsの値のデータ型が配列にしとかないとmap()が使えない
      posts = this.state.posts.map(post => {
        // ()があると改行が可能になる
        return (
        // <Link to={ '/posts/' + post.id } key={ post.id }>
          <Post
            key={ post.id }
            title={ post.title }
            author={ post.author }
            clicked={ () => this.postSelectedHandler(post.id) } />
          // </Link>
        );
      })
    }

    return (
      <div>
        <section className="Posts">
            { posts }
        </section>
        <Route path={ this.props.match.url + '/:id' } exact component={ FullPost } />
      </div>
    );
  }

}

export default Posts;
