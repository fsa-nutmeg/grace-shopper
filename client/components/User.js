//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/singleUser";
import { Link } from "react-router-dom";
import axios from "axios";

export class SingleUser extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      notes: [],
    };
    this.signIn = this.signIn.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    window.localStorage.removeItem("token");
    this.setState({ auth: {} });
  }
  async attemptTokenLogin() {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data: auth } = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      //use the user id that's returned in the token to make a request for user's notes
      const { id } = auth;
      const { data: notes } = await axios.get(`/api/users/${id}/notes`, {
        headers: {
          authorization: token,
        },
      });
      this.setState({ auth, notes });
    }
  }
  componentDidMount() {
    this.attemptTokenLogin();
    const userId = this.props.match.params.id;
    this.props.getSingleUser(userId);
  }
  async signIn(credentials) {
    const response = await axios.post("/api/auth", credentials);
    const { token } = response.data;
    window.localStorage.setItem("token", token);
    this.attemptTokenLogin();
  }

  render() {
    console.log("window", window.localStorage);
    return (
      <div>
        {this.props.user ? (
          <div>
            <div>
              {this.props.user.isAdmin ? <div>ADMIN</div> : <div></div>}
            </div>
            <div id="single-user-detail">
              <div>
                <p>Email:{this.props.user.email}</p>
                <p>Address:{this.props.user.address}</p>
              </div>
            </div>
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
