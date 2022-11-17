import axios from 'axios';

// ACTIONS
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART';
const CHANGE_QUANTITY = 'GUEST_CHANGE_QUANTITY';

// ACTION CREATORS
const addToGuestCart = album => {
  return {
    type: ADD_TO_GUEST_CART,
    album,
  };
};

export const changeQuantity = (albumId, qty) => {
  return {
    type: CHANGE_QUANTITY,
    albumId,
    qty,
  };
};

// THUNKS
export const addAlbumToGuestCart = albumId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/albums/${albumId}`);

      const newItem = {};
      newItem.price = data.price;
      newItem.quantity = 1;
      newItem.album = {};
      newItem.album.id = albumId;
      newItem.album.title = data.title;
      newItem.album.artistName = data.artistName;
      newItem.album.image = data.image;
      dispatch(addToGuestCart(newItem));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];

// helper function to update state
const addAlbumToState = (album, state) => {
  let found = false;
  state.forEach(item => {
    if (item.album.id === album.album.id) {
      item.quantity += 1;
      found = true;
    }
  });
  // if not found, add to item array
  if (!found) state = [...state, album];
  return state;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_GUEST_CART:
      return addAlbumToState(action.album, state);
    case CHANGE_QUANTITY:
      return state.map(item =>
        item.album.id == action.albumId
          ? { ...item, quantity: action.qty }
          : item
      );
    default:
      return state;
  }
};
