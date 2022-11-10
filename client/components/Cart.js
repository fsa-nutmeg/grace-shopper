import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const userId = 5;
import { fetchCart } from '../store/cartInventory';
import CartAlbumCard from './CartAlbumCard';
import Button from 'react-bootstrap/Button';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
    };
  }
  componentDidMount() {
    this.props.getCart(userId);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.inventory) !==
      JSON.stringify(this.props.inventory)
    ) {
      this.setState({
        inventory: this.props.inventory,
      });
    }
  }

  handleQuantityChange() {}

  render() {
    const { inventory } = this.state;
    if (!inventory.length) return <div>Nothing In Cart</div>;
    const total = inventory
      .reduce((total, album) => total + album.price * album.quantity, 0)
      .toFixed(2);

    return (
      <div className='cart-container'>
        <h2>{`Subtotal $${total}`}</h2>
        <Button>Checkout</Button>
        <div className='albums-view'>
          {inventory.map(item => {
            const { id, price, quantity, album } = item;
            const { image, title, artistName } = album;
            return (
              <CartAlbumCard
                key={id}
                price={price}
                quantity={quantity}
                image={image}
                title={title}
                artistName={artistName}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return { inventory: state.cartInventory };
};

const mapDispatch = dispatch => {
  return { getCart: userId => dispatch(fetchCart(userId)) };
};
export default connect(mapState, mapDispatch)(Cart);
