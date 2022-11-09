//[X] build this store
import axios from "axios";

// ACTIONS
const SET_SINGLE_ALBUM = "SET_SINGLE_ALBUM";

// ACTION CREATORS

export const setSingleAlbum = (album) => {
  return {
    type: SET_SINGLE_ALBUM,
    album,
  };
};

// THUNK CREATORS

export const fetchSingleAlbum = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/album");
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
      return action.album;
    default:
      return state;
  }
}
