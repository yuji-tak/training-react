import React, { Component } from 'react';
import axios from 'axios';
import './Posts.css';

import Post from '../../../components/Post/Post';

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
    this.setState({ selectedPostId: id });
  }

  render () {

    let posts = <p style={{ textAlign: "center" }}>Something went wrong!!!</p>

    if (!this.state.error) {
      // postsの値のデータ型が配列にしとかないとmap()が使えない
      posts = this.state.posts.map(post => {
        return <Post
        key={ post.id }
        title={ post.title }
        author={ post.author }
        clicked={ () => this.postSelectedHandler(post.id) } />
      })
    }

    return (
      <section className="Posts">
          { posts }
      </section>
    );
  }

}

export default Posts;
