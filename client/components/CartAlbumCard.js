import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CartAlbumCard = props => {
  const { price, qty, image, title, artistName, id, handleQtyChange } = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{artistName}</Card.Text>
        <div className='cart-btn-grp'>
          <span
            className='cart-btn'
            onClick={() => handleQtyChange(id, qty - 1)}
          >
            -
          </span>
          <span>{`  ${qty}  `}</span>
          <span
            className='cart-btn'
            onClick={() => handleQtyChange(id, qty + 1)}
          >
            +
          </span>{' '}
        </div>{' '}
        <Card.Text className='price'>{`$${(price * qty).toFixed(
          2
        )}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CartAlbumCard;
