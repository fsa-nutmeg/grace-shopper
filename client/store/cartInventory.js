import axios from "axios";

// ACTIONS
const ADD_TO_CART = 'ADD_TO_CART';
const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
const REMOVE_ITEM = 'REMOVE_ITEM';
const GET_CART_ITEMS = 'GET_CART_ITEMS';

// ACTION CREATEORS
export const addToCart = (albumId) => {
  return {
    type: ADD_TO_CART,
    albumId,
  };
};

export const incrementQuantity = (albumId, value) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: {
      albumId,
      value,
    }
  }
}

export const decrementQuantity = (albumId, value) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: {
      albumId,
      value,
    }
  }
}

export const removeItem = (albumId) => {
  return {
    type: REMOVE_ITEM,
    albumId,
  }
}

export const getCartItems = (albums) => {
  return {
    type: GET_CART_ITEMS,
    albums,
  }
}

// THUNK CREATORS
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(getCartItems(data.items));
    } catch (err) {
      console.log(err);
    }
  }
}

// export const fetchCart = (userId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`/api/users/${userId}/cart`);
//       dispatch(getCartItems(data.items));
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }




//INITIAL STATE
const initialState = [];


// REDUCERS
export default function cartInventoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.albumId;
    case INCREMENT_QUANTITY:
      return action.albumId;
    case DECREMENT_QUANTITY:
      return action.albumId;
    case REMOVE_ITEM:
      return action.albumId;
    case GET_CART_ITEMS:
      return action.albums;
    default:
      return state;
  }
}
