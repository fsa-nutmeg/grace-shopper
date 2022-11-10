import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const userId = 7;
import { fetchCart } from "../store/cartInventory"
export class Cart extends React.Component {
constructor() {
  super();
  this.state = {
inventory: [],

  }
}
componentDidMount() {
  this.props.getCart(userId);
}

componentDidUpdate(prevProps) {
  if(JSON.stringify(prevProps.inventory) != JSON.stringify(this.props.inventory)) {
    this.setState({
      inventory: this.props.inventory,
    });
  }
}

  render() {
    return <div>{JSON.stringify(this.state.inventory)}</div>
}}

const mapState = (state) => {
  return { inventory: state.cartInventory }
}

const mapDispatch = (dispatch) => {
  return {getCart: (userId) => dispatch(fetchCart(userId))
}}
export default connect(mapState, mapDispatch)(Cart);
