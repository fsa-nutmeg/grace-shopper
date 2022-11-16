//[ ] build this component
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchCartInfo } from '../store/cartInfo';
import { fetchCart } from '../store/cartInventory';
import {
  fetchSingleAlbum,
  deleteAlbum,
  updateAlbum,
} from '../store/singleAlbum';

export class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleAlbum: {},
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.getSingleAlbum(albumId);
    this.props.fetchUserCartItems();
    this.props.fetchUserCartInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.singleAlbum !== this.state.singleAlbum) {
      const albumId = this.props.match.params.albumId;
      this.props.getSingleAlbum(albumId);
      this.setState({
        singleAlbum: this.props.singleAlbum,
      });
    }
  }

  onClick(e) {
    e.preventDefault();
    const loggedIn = this.props.auth.id !== undefined;
    const hasCart = Boolean(
      this.props.userCartInfo.id || this.props.guestCartItems.length
    );

    const albumId = this.state.singleAlbum.id;
    const { price } = this.state.singleAlbum;

    if (loggedIn) {
      if (hasCart) {
      } else {
      }
    } else {
    }
  }

  render() {
    console.log('props', this.props);
    console.log('state', this.state);
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
              <Card.Link href='#'>add to cart</Card.Link>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              {this.props.singleAlbum.tracks.map((track, i) => (
                <ListGroup.Item>
                  {i + 1}. {track}
                </ListGroup.Item>
              ))}
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
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
