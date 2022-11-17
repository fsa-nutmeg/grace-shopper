//[ ] build this component
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchCartInfo, createCart } from '../store/cartInfo';
import { fetchCart, addItemToCart } from '../store/cartInventory';
import { addAlbumToGuestCart } from '../store/guestCartInventory';
import {
  fetchSingleAlbum,
  deleteAlbum,
  updateAlbum,
} from '../store/singleAlbum';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';

export class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleAlbum: {},
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.getSingleAlbum(albumId);
    this.props.fetchUserCartItems();
    this.props.fetchUserCartInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.singleAlbum !== this.props.singleAlbum) {
      this.setState({
        singleAlbum: this.props.singleAlbum,
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const loggedIn = this.props.auth.id !== undefined;
    const hasCart = Boolean(
      this.props.userCartInfo.id || this.props.guestCartItems.length
    );

    const albumId = this.state.singleAlbum.id;
    const { price } = this.state.singleAlbum;

    if (loggedIn) {
      if (hasCart) {
        const { addAlbumToUserCart, userCartInfo } = this.props;
        const cartId = userCartInfo.id;
        addAlbumToUserCart(albumId, cartId, price);
      } else {
        const { createUserCart, auth } = this.props;
        const userId = auth.id;
        createUserCart(userId, albumId, price);
      }
      setTimeout(() => {
        this.props.fetchUserCartInfo();
        this.props.fetchUserCartItems();
      }, 200);
    } else {
      this.props.addToGuestCart(albumId);
    }
  }

  render() {
    console.log('guest cart inventory.... ', this.props.guestCartItems);
    if (!this.props.singleAlbum.title) {
      return <div>loading album...</div>;
    }
    return (
      <div className='singleAlbum-container'>
        <div className='card-container'>
          <Card className='singleAlbum-card'>
            <Card.Img variant='top' src={this.props.singleAlbum.image} />
            <Card.Body>
              <Card.Title>{this.props.singleAlbum.title}</Card.Title>
              <Card.Text>{this.props.singleAlbum.description}</Card.Text>
              <div className='d-grid gap-2'>
                <Button type='submit' variant='info' onClick={this.handleClick}>
                  Add To Cart
                </Button>{' '}
              </div>
              {/* <Card.Link href="/cart">add to cart</Card.Link> */}
            </Card.Body>

            <ListGroup className='list-group-flush'>
              {this.props.singleAlbum.tracks ? (
              this.props.singleAlbum.tracks.map((track, i) => (
                <ListGroup.Item>
                  {i + 1}. {track}
                </ListGroup.Item>
              ))) : (
                <div></div>
              )}
            </ListGroup>
          </Card>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    singleAlbum: state.singleAlbum,
    userCartInfo: state.cartInfo,
    userCartItems: state.cartInventory,
    guestCartItems: state.guestInventory,
    auth: state.auth,
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleAlbum: id => dispatch(fetchSingleAlbum(id)),
    fetchUserCartItems: () => dispatch(fetchCart()),
    fetchUserCartInfo: () => dispatch(fetchCartInfo()),
    addAlbumToUserCart: (albumId, orderId, price) =>
      dispatch(addItemToCart(albumId, orderId, price)),
    createUserCart: (userId, albumId, albumPrice) =>
      dispatch(createCart(userId, albumId, albumPrice)),
    addToGuestCart: albumId => dispatch(addAlbumToGuestCart(albumId)),
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
