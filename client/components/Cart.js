import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, changeItemQty } from "../store/cartInventory";
import { fetchCartInfo, updateCartInfo } from "../store/cartInfo";
import { fetchSingleOrder } from "../store/singleOrder";
import Checkout from "./Checkout";
import CartAlbumCard from "./CartAlbumCard";
import CompletedOrder from "./CompletedOrder";
import Button from "react-bootstrap/Button";
import { addAlbumToGuestCart } from "../store/guestCartInventory";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: null,
      inventory: [],
      checkout: false,
      completed: false,
    };

    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }
  componentDidMount() {
    this.props.getCart();
    this.props.getCartInfo();
    if (this.props.auth.id || this.props.inventory.length) {
      this.setState({ inventory: this.props.inventory });
    } else {
      this.setState({ inventory: this.props.guestInventory });
    }
  }

  componentDidUpdate(prevProps) {
    const changes = {};

    const prevInventory = JSON.stringify(prevProps.inventory);
    const currInventory = JSON.stringify(this.props.inventory);

    if (prevInventory !== currInventory) {
      changes.inventory = this.props.inventory;
    }

    if (prevProps.info.id !== this.props.info.id) {
      changes.orderId = this.props.info.id;
    }

    // uses Boolean so that undefined, null and false all coerce to false
    if (
      Boolean(prevProps.info.completed) !== Boolean(this.props.info.completed)
    ) {
      changes.completed = this.props.info.completed;
    }

    if (
      Boolean(prevProps.guestInfo.completed) !==
      Boolean(this.props.guestInfo.completed)
    ) {
      this.props.getOrder(+this.props.guestInfo.id);
      changes.completed = this.props.guestInfo.completed;
      changes.orderId = this.props.guestInfo.id;
    }

    if (Object.keys(changes).length) {
      this.setState(changes);
    }
  }

  toggleCheckout(e) {
    e.preventDefault();
    this.setState((prevState) => ({ checkout: !prevState.checkout }));
  }

  handleQtyChange(id, qty) {
    const { changeQty } = this.props;
    changeQty(id, qty);
  }

  render() {
    const { inventory, checkout, completed, orderId } = this.state;
    const { updateInfo, getOrder } = this.props;

    if (!inventory.length)
      return <div className="cart-container">Nothing In Cart</div>;

    const total = inventory
      .reduce((total, album) => total + album.price * album.quantity, 0)
      .toFixed(2);

    return (
      <div className="home">
        <div className="cart-container">
          <h2>{`Subtotal $${total}`}</h2>
          {completed ? (
            <CompletedOrder orderId={orderId} />
          ) : checkout ? (
            <Checkout
              orderId={orderId}
              toggleCheckout={this.toggleCheckout}
              updateInfo={updateInfo}
              getOrder={getOrder}
            />
          ) : (
            <Button onClick={this.toggleCheckout}>Checkout</Button>
          )}
          <div className="albums-view">
            {inventory.map((item) => {
              const { id, price, quantity, album } = item;
              const { image, title, artistName } = album;
              return (
                <CartAlbumCard
                  key={id}
                  id={id}
                  price={price}
                  qty={quantity}
                  image={image}
                  title={title}
                  artistName={artistName}
                  handleQtyChange={this.handleQtyChange}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
    inventory: state.cartInventory,
    guestInventory: state.guestInventory,
    guestInfo: state.guestInfo,
    info: state.cartInfo,
    user: state.singleUser,
    order: state.singleOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCart()),
    getCartInfo: () => dispatch(fetchCartInfo()),
    changeQty: (id, qty) => dispatch(changeItemQty(id, qty)),
    updateInfo: (id, updates) => dispatch(updateCartInfo(id, updates)),
    getOrder: (id) => dispatch(fetchSingleOrder(id)),
    addToGuestCart: (albumId) => dispatch(addAlbumToGuestCart(albumId)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
