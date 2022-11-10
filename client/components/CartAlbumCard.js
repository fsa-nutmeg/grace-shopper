import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const CartAlbumCard = props => {
  const { price, quantity, image, title, artistName } = props;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{artistName}</Card.Text>
        <Card.Text className='price'>{`$${price * quantity}`}</Card.Text>
        <div>
          <span>-</span>
          <span>{` ${quantity} `}</span>
          <span>+</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartAlbumCard;
