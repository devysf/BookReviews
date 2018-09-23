import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layout/NavBar";
import StartPage from "./components/posts/StartPage";
import HomePage from "./components/profile/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import BookReviewForm from "./components/posts/BookReviewForm";
import SinglePost from "./components/posts/SinglePost";

import axios from "axios";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";

if (localStorage.jwtToken) {
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;

  const decodedJwt = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decodedJwt));

  if (decodedJwt.exp < Date.now() / 1000) {
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={StartPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/post/:id" component={SinglePost} />

            <Switch>
              <PrivateRoute exact path="/home" component={HomePage} />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/profile" component={ProfilePage} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/create-review"
                component={BookReviewForm}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
