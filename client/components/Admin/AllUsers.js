//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { fetchAllUsers } from "../../store/allUsers";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    console.log("props,", this.props);
  }

  render() {
    const users = this.props.users;
    return (
      <div>
        <div className="allAlbums-title">All Users</div>
        <div className="allAlbums">
          {users.length ? (
            users.map((users) => (
              <div key={users.id}>
                <form onSubmit={(ev) => ev.preventDefault()}></form>
                <Link to={`/users/${users.id}`} key={users.id}>
                  <div className="specificAlbum" key={users.id}>
                    <MDBCard className="albums-view" style={{ width: "18rem" }}>
                      <MDBCardImage
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle className="album-title">
                          {users.email}
                        </MDBCardTitle>
                        <MDBCardText className="price">{`${users.address}`}</MDBCardText>
                        <MDBCardText className="album-title">{`${
                          users.isAdmin ? "ADMIN" : "USER"
                        }`}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No Users...</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { users: state.users };
};

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
