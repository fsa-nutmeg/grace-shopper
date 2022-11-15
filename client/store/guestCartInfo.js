import axios from 'axios';

// ACTIONS
const SET_GUEST_CART_INFO = 'SET_GUEST_CART_INFO';

// ACTION CREATORS
export const setGuestCartInfo = info => {
  return {
    type: SET_GUEST_CART_INFO,
    info,
  };
};

// THUNKS
export const guestCartCheckout = (items, shippingInfo, billingInfo) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('api/orders/guest', {
        items: items,
        shippingInfo: shippingInfo,
        billingInfo: billingInfo,
      });

      const order = {};
      order.id = data.id;
      order.shippingInfo = data.shippingInfo;
      order.billingInfo = data.billingInfo;
      order.completed = true;

      dispatch(setGuestCartInfo(order));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GUEST_CART_INFO:
      return action.info;
    default:
      return state;
  }
};
