import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { addPost } from "../../actions/postActions";

class BookReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      image: "",
      description: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newBook = {
      bookName: this.state.bookName,
      image: this.state.image,
      description: this.state.description
    };

    console.log(newBook);

    this.props.addPost(newBook, this.props.history);
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="bookName">Book Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="bookName"
              name="bookName"
              placeholder="Enter book name of that you reviews"
              value={this.state.bookName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="image"
              name="image"
              placeholder="Enter a image url of book"
              value={this.state.image}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control form-control-lg"
              id="description"
              name="description"
              placeholder="Enter a description "
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addPost }
)(withRouter(BookReviewForm));
