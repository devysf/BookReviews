import axios from "axios";

import { GET_POSTS } from "./types";

export const getPosts = () => dispatch => {
  axios
    .get("/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const addPost = (newBook, history) => dispatch => {
  axios
    .post("/posts", newBook)
    .then(res => history.push("/"))
    .catch(err => console.log(err));
};
