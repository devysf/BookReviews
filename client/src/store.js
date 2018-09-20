import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

//Why we use redux-thunk
/*
By default actions in Redux are dispatched synchronously, which is a problem for any non-trivial app that needs to communicate with an external API or perform side effects. Thankfully though, Redux allows for middleware that sits between an action being dispatched and the action reaching the reducers. There are two very popular middleware libraries that allow for side effects and asynchronous actions: Redux Thunk and Redux Saga. In this post we’ll introduce the former: Redux Thunk.

The most common use-case for Redux Thunk is for communicating asynchronously with an external API to retrieve or save data. Redux Thunk makes it easy to dispatch actions that follow the lifecycle of a request to an external API.

For instance, given the common example of a todo app, creating a new todo item normally involves first dispatching an action to indicate that a todo item creation as started, then, if the todo item is successfully created and returned by the external server, dispatching another action with the new todo item. In the case where there’s an error and the todo fails to be saved on the server, an action with the error can be dispatched instead.


*/
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
