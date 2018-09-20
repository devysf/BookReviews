import React, { Component } from "react";
import classnames from "classnames";

import { connect } from "react-redux";

import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);

    this.props.registerUser(newUser);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name
              })}
              id="name"
              name="name"
              placeholder="Enter name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              id="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password2"> Confirm Password</label>
            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password2
              })}
              id="password2"
              name="password2"
              placeholder="Repeat password"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
