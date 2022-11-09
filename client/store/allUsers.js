//[X] build this store

import axios from "axios";

// ACTIONS
const SET_ALL_USERS = "SET_ALL_USERS";

// ACTION CREATORS

export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    users,
  };
};

// THUNK CREATORS

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allUsers");
      dispatch(setAllUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// INITIAL STATE
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}
