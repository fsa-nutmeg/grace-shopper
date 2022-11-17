import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { me } from "../store";
import { fetchSingleUser } from "../store/singleUser";
import { NavLink } from "react-router-dom";
// import { User } from "../../server/db/";

class Navbars extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null };
  }
  componentDidMount(prev) {
    this.props.loadInitialData();
    this.props.fetchSingleUser();

    this.setState({ userId: this.props.user.id });
  }
  componentDidUpdate(prev) {}
  // fetchSingleUser

  render() {
    const { isLoggedIn } = this.props;
    function logout() {
      window.localStorage.removeItem("token");
      window.location.replace("/home");
    }
    return (
      <div>
        {isLoggedIn ? (
          <Navbar
            collapseOnSelect
            expand="lg"
            text="light"
            bg="dark"
            variant="dark"
          >
            <Container>
              <Navbar.Brand style={{ width: "50vw" }}>
                <img
                  alt=""
                  src="/test-art/vinyal_logo-removebg-preview.png"
                  width="150"
                  height="150"
                  className="d-inline-block  rounded-circle"
                />
                <NavLink to="/home">
                  <h1>{"High Rise Records"}</h1>
                </NavLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  <NavLink to="/albums">All Albums</NavLink>

                  {/* <Nav.Link href="#pricing">Genre</Nav.Link> */}
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={logout}>
                      Log Out
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to={`/users/${this.props.user.id}`}>
                        User Info
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <NavLink to="/cart">Cart</NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                  {this.props.user.isAdmin ? (
                    <div>
                      <NavDropdown title="Admin Tools">
                        <NavDropdown.Item>
                          <NavLink to="admin/allusers">All User Info</NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <NavLink to="/admin/allalbums">
                            Edit Existing Albums
                          </NavLink>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <NavLink to="/admin/addalbum">Add New Album</NavLink>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar
            collapseOnSelect
            expand="lg"
            text="light"
            bg="dark"
            variant="dark"
          >
            <Container>
              <Navbar.Brand style={{ width: "50vw" }}>
                <img
                  alt=""
                  src="/test-art/vinyal_logo-removebg-preview.png"
                  width="150"
                  height="150"
                  className="d-inline-block  rounded-circle"
                />
                <NavLink to="/home">
                  <h1>{"High Rise Records"}</h1>
                </NavLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/albums">All Albums</NavLink>
                  {/* <Nav.Link href="#pricing">Genre</Nav.Link> */}
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <NavLink to="/login">Log In</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink to="/signup">Sign Up</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <NavLink to="/cart">Cart</NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    user: state.user,
    id: state.auth.id,
  };
};

// const mapUser = (state) => {
//   return {
//     user: state.user,
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchSingleUser(id) {
      dispatch(fetchSingleUser(id));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbars);

// export const User = connect(mapUser, mapDispatch)(Navbars);
