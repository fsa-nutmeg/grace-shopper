//[X] build this store
import axios from "axios";

// ACTIONS
const SET_ALL_ALBUMS = "SET_ALL_ALBUMS";

// ACTION CREATORS

export const setAllAlbums = (albums) => {
  return {
    type: SET_ALL_ALBUMS,
    albums,
  };
};

// THUNK CREATORS

export const fetchAlbums = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/allAlbums");
      dispatch(setAllAlbums(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// INITIAL STATE
const initialState = [];

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}
