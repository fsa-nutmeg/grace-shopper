//[X] build this store
import axios from "axios";

// ACTIONS
const SET_SINGLE_USER = "SET_SINGLE_USER";

// ACTION CREATORS

export const setSingleUser = (user) => {
  return {
    type: SET_SINGLE_USER,
    user,
  };
};

// THUNK CREATORS

export const fetchSingleUser = (id) => {
  const token = window.localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setSingleUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// INITIAL STATE
const initialState = {};

export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
