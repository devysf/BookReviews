import React, { Component } from "react";
import { connect } from "react-redux";

import { getCurrentUser } from "../actions/profileActions";

class ProfilePage extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    this.props.getCurrentUser();

    this.setState({
      id: this.props.profile.id,
      name: this.props.profile.name,
      email: this.props.profile.email
    });
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(ProfilePage);
