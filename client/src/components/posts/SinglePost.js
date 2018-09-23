import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../../actions/postActions";
import { addComment } from "../../actions/postActions";

import isEmpty from "../../helpers/isEmpty";

class SinglePost extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getPostById(this.props.match.params.id);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { id } = this.props.match.params;

    const newComment = {
      message: this.state.message,
      name: user.name,
      user: user
    };

    this.props.addComment(newComment, id);
    this.setState({ message: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { post } = this.props.post;

    const cardStyle = {
      height: "10%",
      width: "20%",
      margin: "auto"
    };
    const avatarStyle = {
      height: "50px",
      width: "50px"
    };

    var commentForm = (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-dark text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  placeholder="Reply to post"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );

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
        <div className="card text-center">
          <div className="card-header">Review of {post.bookName}</div>
          <img
            className="card-img-top"
            src={post.image}
            alt="Card image cap"
            style={cardStyle}
          />
          <div className="card-body">
            <h5 className="card-title">Review by {post.username}</h5>
            <p className="card-text">{post.description}</p>
          </div>
          <div className="card-footer text-muted">2 days ago</div>
        </div>
        <hr />
        {commentForm}
        {commentContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getPostById, addComment }
)(SinglePost);
