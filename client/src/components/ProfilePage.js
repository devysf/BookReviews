import React, { Component } from "react";
import { connect } from "react-redux";

import { getCurrentUser } from "../actions/profileActions";

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getCurrentUser();

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { profile } = this.props;

    return (
      <div>
        <h1> Profile Page </h1>
        <h1> Helllo {profile.name}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(ProfilePage);
