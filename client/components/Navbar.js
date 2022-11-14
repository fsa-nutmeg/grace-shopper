import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { me } from "../store";
import { fetchSingleUser } from "../store/singleUser";
import { User } from "../../server/db/";

class Navbars extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: null };
  }
  componentDidMount(prev) {
    this.props.loadInitialData();
    this.fetchSingleUser(User.findByToken(window.localStorage.token));
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
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/home">Nutmeg Records</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {/* <LinkContainer to="/allAlbums"> */}
                  <Nav.Link href="/albums">All Albums</Nav.Link>
                  {/* </LinkContainer> */}
                  <Nav.Link href="#pricing">Genre</Nav.Link>
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={logout}>
                      Log Out
                    </NavDropdown.Item>
                    <NavDropdown.Item href={`/users/${this.state.userId}`}>
                      User Info
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Cart</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/home">Nutmeg Records</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {/* <LinkContainer to="/allAlbums"> */}
                  <Nav.Link href="/albums">All Albums</Nav.Link>
                  {/* </LinkContainer> */}
                  <Nav.Link href="#pricing">Genre</Nav.Link>
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Cart</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
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
