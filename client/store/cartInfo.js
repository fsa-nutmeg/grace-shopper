import axios from 'axios';

//ACTIONS
const SET_CART_INFO = 'SET_CART_INFO';
const UPDATE_CART_INFO = 'UPDATE_CART_INFO';

// ACTION CREATORS
export const setCartInfo = info => {
  return {
    type: SET_CART_INFO,
    info,
  };
};

export const updateCart = updates => {
  return {
    type: UPDATE_CART_INFO,
    updates,
  };
};

//THUNK CREATORS
export const fetchCartInfo = userId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      delete data.items;
      dispatch(setCartInfo(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCartInfo = (orderId, updates) => {
  return async dispatch => {
    try {
      const { data } = await axios.put('/api/orders', {
        ...updates,
        id: orderId,
      });
      dispatch(updateCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// INITIAL STATE
const initialState = {};

// REDUCERS
export default function cartInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART_INFO:
      return action.info;
    case UPDATE_CART_INFO:
      return { ...state, ...action.updates };
    default:
      return state;
  }
}
