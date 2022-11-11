import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import auth from "../newAuth/reducers/auth";
// import message from "../newAuth/reducers/message"
import auth from "./auth";
import albumsReducer from "./allAlbums";
import singleAlbumReducer from "./singleAlbum";
import usersReducer from "./allUsers";
import singleUserReducer from "./singleUser";
import message from "../newAuth/reducers/message";

const reducer = combineReducers({
  auth: auth,
  // message: message,
  albums: albumsReducer,
  singleAlbum: singleAlbumReducer,
  users: usersReducer,
  user: singleUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
