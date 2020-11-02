import React, { Component } from 'react';

import './FullPost.css';

// class
class FullPost extends Component {
    render () {
        // 変数宣言
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        // 条件分岐
        if (this.props.id) {
          post = (
              <div className="FullPost">
                  <h1>Title</h1>
                  <p>Content</p>
                  <div className="Edit">
                      <button className="Delete">Delete</button>
                  </div>
              </div>

          );
        }

        // render()へ値を返す
        return post;
    }
}

export default FullPost;
