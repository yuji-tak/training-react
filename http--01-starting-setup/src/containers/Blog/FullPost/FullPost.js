import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

// class
class FullPost extends Component {

  state = {
    loadedPost: null
  }

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate () {
    this.loadData();
  }

  loadData () {
    if (this.props.match.params.id) {
      // loadedPostがnullか、オブジェクトがあるかつidが異なっている
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== Number(this.props.match.params.id))) {
        // 後にidが続く必要がある為、/posts/
        axios.get('/posts/' + this.props.match.params.id)
          .then(res => {
            this.setState({ loadedPost: res.data });
          });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then(res => {
        console.log(res);
      });
  }

    render () {
        // 変数宣言
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        // これがないと、axiosの処理前にレンダリングを求めることになりエラー
        if (this.props.match.params.id) {
          post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        // 条件分岐
        if (this.state.loadedPost) {
          post = (
              <div className="FullPost">
                  <h1>{ this.state.loadedPost.title }</h1>
                  <p>{ this.state.loadedPost.body }</p>
                  <div className="Edit">
                      <button onClick={ this.deletePostHandler } className="Delete">Delete</button>
                  </div>
              </div>
          );
        }

        // render()へ値を返す
        return post;
    }
}

export default FullPost;
