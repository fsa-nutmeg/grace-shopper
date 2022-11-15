import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';

const CompletedOrder = props => {
  const { order } = props;

  if (!Object.keys(order).length) return <div>Loading Order...</div>;

  const { shippingInfo, items } = order;
  // normalize data before render
  const albums = items.map(album => {
    const result = {};

    result.qty = album.quantity;
    result.artist = album.album.artistName;
    result.title = album.album.title;

    return result;
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th colSpan='3'>
            <h3>Thank You For Your Order!</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ships To:</td>
          <td colSpan='2'>{shippingInfo}</td>
        </tr>
        <tr>
          <td colSpan='3'>
            <h3>Albums</h3>
          </td>
        </tr>
        {albums.map((album, i) => (
          <tr key={i}>
            <td>{album.qty}</td>
            <td>{album.artist}</td>
            <td>{album.title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const mapState = state => ({
  order: state.singleOrder,
});

export default connect(mapState)(CompletedOrder);
