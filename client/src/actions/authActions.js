import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

export const registerUser = data => dispatch => {
  axios
    .post("/users/register", data)
    .then(res => {
      const decodedJWT = jwt_decode(res.data.token);

      dispatch(setCurrentUser(decodedJWT));
    })
    .catch(err => console.log(err));
};

export const loginUser = data => dispatch => {
  axios
    .post("/users/login", data)
    .then(res => {
      const decodedJWT = jwt_decode(res.data.token);

      dispatch(setCurrentUser(decodedJWT));
    })
    .catch(err => console.log(err));
};

export const setCurrentUser = decodedJWT => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedJWT
  };
};
