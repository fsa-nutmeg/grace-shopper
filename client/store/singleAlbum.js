//[X] build this store
import axios from "axios";

// ACTIONS
const SET_SINGLE_ALBUM = "SET_SINGLE_ALBUM";

// ACTION CREATORS

export const setSingleAlbum = (singleAlbum) => {
  return {
    type: SET_SINGLE_ALBUM,
    singleAlbum,
  };
};

// THUNK CREATORS

export const fetchSingleAlbum = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/albums/${id}`);
      dispatch(setSingleAlbum(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// INITIAL STATE
const initialState = {};

export default function singleAlbumReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ALBUM:
      return action.singleAlbum;
    default:
      return state;
  }
}
