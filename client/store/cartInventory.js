import axios from 'axios';

// ACTIONS
const ADD_TO_CART = 'ADD_TO_CART';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
const REMOVE_ITEM = 'REMOVE_ITEM';
const GET_CART_ITEMS = 'GET_CART_ITEMS';

// ACTION CREATEORS
export const addToCart = album => {
  return {
    type: ADD_TO_CART,
    album,
  };
};

export const changeQuantity = (itemId, qty) => {
  return {
    type: CHANGE_QUANTITY,
    itemId,
    qty,
  };
};

export const removeItem = itemId => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};

export const getCartItems = albums => {
  return {
    type: GET_CART_ITEMS,
    albums,
  };
};

// THUNK CREATORS
export const fetchCart = () => {
  const token = window.localStorage.getItem('token');
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/orders/cart', {
        headers: { authorization: token },
      });
      dispatch(getCartItems(data.items));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addItemToCart = (albumId, orderId, price) => {
  const token = window.localStorage.getItem('token');
  return async dispatch => {
    try {
      const { data: cart } = await axios.get('/api/orders/cart', {
        headers: { authorization: token },
      });

      const { items } = cart;

      let orderItemId = 0,
        orderItemQty = 0;

      items.forEach(item => {
        if (item.album.id === albumId) {
          orderItemId = item.id;
          orderItemQty = item.quantity + 1;
        }
      });

      if (orderItemId !== 0) {
        const { data: updated } = await axios.put('/api/orderAlbums', {
          id: +orderItemId,
          quantity: orderItemQty,
        });

        dispatch(changeQuantity(orderItemId, orderItemQty));
      } else {
        const { data: orderItem } = await axios.post('/api/orderAlbums', {
          orderId: orderId,
          albumId: albumId,
          price: price,
          quantity: 1,
        });
        const { data: album } = await axios.get(`/api/albums/${albumId}`);

        delete album.quantity;
        delete album.tracks;
        delete album.staffPick;
        delete album.description;
        delete album.genre;
        delete album.createdAt;
        delete album.updatedAt;

        dispatch(addToCart(album));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeItemQty = (orderAlbumId, qty) => {
  return async dispatch => {
    try {
      if (qty > 0) {
        const { data } = await axios.put('/api/orderAlbums', {
          id: +orderAlbumId,
          quantity: qty,
        });
        const { id, quantity } = data;

        dispatch(changeQuantity(id, +quantity));
      } else {
        await axios.delete(`api/orderAlbums/${orderAlbumId}`);

        dispatch(removeItem(+orderAlbumId));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//INITIAL STATE
const initialState = [];

// REDUCERS
export default function cartInventoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.album];
    case CHANGE_QUANTITY:
      return state.map(item =>
        item.id === action.itemId ? { ...item, quantity: action.qty } : item
      );
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.itemId);
    case GET_CART_ITEMS:
      return action.albums;
    default:
      return state;
  }
}
