//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/singleUser";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

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
          <div className="specificAlbum" key={this.props.user.id}>
            <MDBCard className="albums-view" style={{ width: "18rem" }}>
              <MDBCardImage
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                position="top"
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle className="album-title">
                  {this.props.user.email}
                </MDBCardTitle>
                <MDBCardText className="price">{`${this.props.user.address}`}</MDBCardText>
                <MDBCardText className="album-title">{`${
                  this.props.user.isAdmin ? "ADMINISTRATOR" : "USER"
                }`}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
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
