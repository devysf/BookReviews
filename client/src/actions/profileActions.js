import axios from "axios";

import { GET_CURRENT_USER } from "./types";

export const getCurrentUser = () => dispatch => {
  axios
    .get("/users/currentUser")
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
