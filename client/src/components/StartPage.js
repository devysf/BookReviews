import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";

class StartPage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    var cardStyle = {
      width: "12rem"
    };

    const { posts } = this.props.post;
    console.log(posts);
    if (posts) {
      console.log(posts);
      var displayPosts = posts.map(post => (
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="card " style={cardStyle}>
            <img
              className="card-img-top"
              src={post.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{post.bookName}</h5>
              <p className="card-text">{post.description}</p>
              <p className="card-text">Review by {post.username}</p>
              <Link to={`/post/${post._id}`} className="btn btn-primary">
                Go detail reviews
              </Link>
            </div>
          </div>
        </div>
      ));
    } else {
      var displayPosts = <h1> Wait...</h1>;
    }

    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Book Reviews!</h1>
          <p className="lead">
            This site provide you share and discuss books all over the world
          </p>
          <hr className="my-4" />
          <p />
          <p className="lead">
            <Link
              className="btn btn-primary btn-lg"
              to="/create-review"
              role="button"
            >
              Add Your Book Reviews{" "}
            </Link>
          </p>
        </div>
        <div className="row">{displayPosts}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(StartPage);
