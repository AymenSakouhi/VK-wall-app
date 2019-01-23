import React, { Component } from 'react'
import './Post.css';

class Post extends Component {
  constructor (props){
    super(props);
  }
  render() {
    return (
        <div className="post">
            <div className="content">
                <span className="text">{this.props.content}</span>
                <img className="post-image" src={this.props.photo}></img>
            </div>
        </div>
    );
  }
}

export default Post;
