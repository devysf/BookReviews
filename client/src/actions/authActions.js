import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, GET_ERRORS, LOG_OUT_USER } from "./types";

export const registerUser = data => dispatch => {
  axios
    .post("/users/register", data)
    .then(res => {
      localStorage.setItem("jwtToken", res.data.token);

      axios.defaults.headers.common["Authorization"] = res.data.token;

      const decodedJWT = jwt_decode(res.data.token);

      dispatch(setCurrentUser(decodedJWT));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = data => dispatch => {
  axios
    .post("/users/login", data)
    .then(res => {
      localStorage.setItem("jwtToken", res.data.token);

      axios.defaults.headers.common["Authorization"] = res.data.token;

      const decodedJWT = jwt_decode(res.data.token);

      dispatch(setCurrentUser(decodedJWT));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decodedJWT => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedJWT
  };
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");

  delete axios.defaults.headers.common["Authorization"];

  return {
    type: LOG_OUT_USER,
    payload: {}
  };
};
