//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/singleUser";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

export class SingleUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.getSingleUser(userId);
  }

  render() {
    console.log("props", this.props);

    return (
      <div>
        {this.props.user ? (
          <div key={this.props.user.id}>
            <Card className="login-card">
              <Card.Img
                className="login-profile-img-card"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              />
              <Card.Body className="new-Album-form">
                <Card.Title>{this.props.user.email}</Card.Title>
                <Card.Text className="price">{`${this.props.user.address}`}</Card.Text>
                <Card.Text className="album-title">{`${
                  this.props.user.isAdmin ? "ADMINISTRATOR" : "USER"
                }`}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>404 No User Here</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
