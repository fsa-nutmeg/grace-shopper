import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { UsaStates } from 'usa-states';
import { connect } from 'react-redux';
import { guestCartCheckout } from '../store/guestCartInfo';

// makes a list of 51 state abbreviations (includes DC)
const states = Object.values(new UsaStates().states).map(
  ({ abbreviation }) => abbreviation
);

const cardTypes = ['VISA', 'Mastercard', 'American Express'];

// helper function used to validate form data before submitting
// currently only makes sure each field is not empty
// returns true if data is validated
const validateData = ({
  email,
  address1,
  address2,
  city,
  state,
  zip,
  cardType,
  name,
  cardNumber,
  CSC,
}) => {
  if (
    !email.length ||
    !address1.length ||
    !address2.length ||
    !city.length ||
    !zip.length ||
    !name.length ||
    !cardNumber.length ||
    !CSC.length ||
    state === null ||
    cardType === null
  ) {
    alert('FILL IN ALL REQUIRED FIELDS');
    return false;
  }
  return true;
};

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: null,
      zip: '',
      cardType: null,
      name: '',
      cardNumber: '',
      CSC: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validated = validateData(this.state);
    if (validated) {
      const {
        // email,
        address1,
        address2,
        city,
        state,
        zip,
        cardType,
        name,
        cardNumber,
        CSC,
      } = this.state;

      const {
        orderId,
        updateInfo,
        getOrder,
        auth,
        guestInfo,
        guestInventory,
        guestCheckout,
      } = this.props;

      const order = {};

      order.shippingInfo =
        address1 + ' ' + address2 + ' ' + city + ', ' + state + ' ' + zip;
      order.billingInfo =
        cardType + ': ' + cardNumber + ', ' + name + ', ' + CSC;
      order.completed = true;
      
      if (auth.id) {
        updateInfo(+orderId, order);
        getOrder(+orderId);
      } else {
        guestCheckout(guestInventory, order.shippingInfo, order.billingInfo);
      }
      //
    }
  }

  render() {
    const { toggleCheckout } = this.props;
    return (
      <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <Row className='mb-3'>
          <h2>SHIPPING</h2>
        </Row>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='address1'>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder='1234 Main St' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='address2'>
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder='Apartment, studio, or floor' />
        </Form.Group>

        <Row className='mb-3'>
          <Form.Group as={Col} controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue='Choose...'>
              <option value={null} key={0}>
                Choose...
              </option>
              {states.map((state, i) => (
                <option value={state} key={i + 1}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId='zip'>
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <h2>PAYMENT</h2>
        </Row>
        <Form.Group className='checkout-select-grp' controlId='cardType'>
          <Form.Label>Type</Form.Label>
          <Form.Select defaultValue='Choose...'>
            <option value={null} key={0}>
              Choose...
            </option>
            {cardTypes.map((type, i) => (
              <option value={type} key={i + 1}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder='Enter Name On Card' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='cardNumber'>
          <Form.Label>Card Number</Form.Label>
          <Form.Control placeholder='Enter Card Number' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='CSC'>
          <Form.Label>CSC</Form.Label>
          <Form.Control placeholder='Enter Security Code' />
        </Form.Group>
        <Row className='checkout-btn-grp'>
          <Button variant='success' type='submit'>
            Checkout
          </Button>
          <Button onClick={toggleCheckout} variant='warning'>
            Exit Checkout
          </Button>
        </Row>
      </Form>
    );
  }
}

const mapState = state => ({
  auth: state.auth,
  guestInfo: state.guestInfo,
  inventory: state.cartInventory,
  guestInventory: state.guestInventory,
  info: state.cartInfo,
});

const mapDispatch = dispatch => ({
  guestCheckout: (items, shippingInfo, billingInfo) =>
    dispatch(guestCartCheckout(items, shippingInfo, billingInfo)),
});

export default connect(mapState, mapDispatch)(Checkout);
