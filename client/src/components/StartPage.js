import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";

class StartPage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    var cardStyle = {
      width: "18rem"
    };

    const { posts } = this.props.post;

    if (posts) {
      console.log(posts);
      var displayPosts = posts.map(post => (
        <div className="card card-body mb-3" style={cardStyle}>
          <img className="card-img-top" src={post.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{post.bookName}</h5>
            <p className="card-text">{post.description}</p>
            <a href="#" className="btn btn-primary">
              Go detail reviews
            </a>
          </div>
        </div>
      ));
    } else {
      var displayPosts = <h1> Wait...</h1>;
    }

    return (
      <div>
        <h1> Start Page </h1>

        <div className="jumbotron">
          <h1 className="display-4">Welcome to Book Reviews!</h1>
          <p className="lead">
            This site provide you share and discuss books all over the world
          </p>
          <hr className="my-4" />
          <p />
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Add Your Book Reviews{" "}
            </a>
          </p>
        </div>
        {displayPosts}
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
