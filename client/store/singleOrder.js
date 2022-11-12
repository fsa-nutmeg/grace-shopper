import axios from 'axios';

// ACTIONS
const SET_ORDER = 'SET_ORDER';

// ACTION CREATORS
const setOrder = order => {
  return {
    type: SET_ORDER,
    order,
  };
};

// THUNKS
export const fetchSingleOrder = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch(setOrder(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
};
