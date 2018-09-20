import { SET_CURRENT_USER, LOG_OUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    default:
      return state;
  }
}
