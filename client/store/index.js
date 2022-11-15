import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import albumsReducer from './allAlbums';
import singleAlbumReducer from './singleAlbum';
import usersReducer from './allUsers';
import singleUserReducer from './singleUser';
import cartInventoryReducer from './cartInventory';
import cartInfoReducer from './cartInfo';
import singleOrderReducer from './singleOrder';

const reducer = combineReducers({
  auth: auth,
  albums: albumsReducer,
  singleAlbum: singleAlbumReducer,
  users: usersReducer,
  user: singleUserReducer,
  cartInventory: cartInventoryReducer,
  cartInfo: cartInfoReducer,
  singleOrder: singleOrderReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
