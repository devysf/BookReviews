import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../actions/postActions";

import isEmpty from "../helpers/isEmpty";

class SinglePost extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getPostById(this.props.match.params.id);
  }
  render() {
    const { post } = this.props.post;
    /*
    const post = {
      bookName: "Inferno",
      image:
        "https://vignette.wikia.nocookie.net/davincicode/images/f/f0/Inferno.jpg/revision/latest?cb=20150617173420",
      username: "Yusuf OZACET",
      description: "Perfect",
      comments: [
        {
          username: "Yunus",
          message: "Hii"
        },
        {
          username: "Yasin",
          message: "Helloooo"
        }
      ]
    };
*/
    const cardStyle = {
      height: "10%",
      width: "20%",
      margin: "auto"
    };
    const avatarStyle = {
      height: "50px",
      width: "50px"
    };

    console.log(post);

    var commentContent;
    if (isEmpty(post.comments)) {
      commentContent = <h1>No comment</h1>;
    } else {
      commentContent = post.comments.map(comment => (
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-4">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src="https://image.freepik.com/free-icon/male-user-profile-picture_318-37825.jpg"
                  alt=""
                  style={avatarStyle}
                />
              </a>
              <br />
            </div>
            <div className="col-md-8">
              <p className="lead">{comment.message}</p>
              <p className="text-center float-right">by {comment.username}</p>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div>
        <div class="card text-center">
          <div class="card-header">Review of {post.bookName}</div>
          <img
            className="card-img-top"
            src={post.image}
            alt="Card image cap"
            style={cardStyle}
          />
          <div class="card-body">
            <h5 class="card-title">Review by {post.username}</h5>
            <p class="card-text">{post.description}</p>
          </div>
          <div class="card-footer text-muted">2 days ago</div>
        </div>

        {commentContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPostById }
)(SinglePost);
