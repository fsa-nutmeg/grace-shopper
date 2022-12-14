//[X] build this store
import axios from "axios";

// ACTIONS
const SET_SINGLE_ALBUM = "SET_SINGLE_ALBUM";
const DELETE_ALBUM = "DELETE_ALBUM";
const UPDATE_ALBUM = "UPDATE_ALBUM";
const CREATE_ALBUM = "CREATE_ALBUM";

// ACTION CREATORS

export const setSingleAlbum = (singleAlbum) => {
  return {
    type: SET_SINGLE_ALBUM,
    singleAlbum,
  };
};

const _deleteAlbum = (singleAlbum) => {
  return {
    type: DELETE_ALBUM,
    singleAlbum,
  };
};

const _updateAlbum = (singleAlbum) => {
  return {
    type: UPDATE_ALBUM,
    singleAlbum,
  };
};

const _createAlbum = (singleAlbum) => {
  return {
    type: CREATE_ALBUM,
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

export const deleteAlbum = (id) => {
  return async (dispatch) => {
    try {
      const { data: deleted } = await axios.delete(`/api/albums/${id}`);
      dispatch(_deleteAlbum(deleted));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateAlbum = (singleAlbum, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/albums/${singleAlbum.id}`,
      singleAlbum
    );
    history.push(`/albums/${singleAlbum.id}`);
    dispatch(_updateAlbum(updated));
  };
};

export const createAlbum = (singleAlbum, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/albums", singleAlbum);
      history.push(`/albums/${singleAlbum.id}`);
      dispatch(_createAlbum(created));
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
    case DELETE_ALBUM:
      return {};
    case UPDATE_ALBUM:
      return action.singleAlbum;
    case CREATE_ALBUM:
      return action.singleAlbum;
    default:
      return state;
  }
}
