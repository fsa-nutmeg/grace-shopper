import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllAlbums from "./components/AllAlbums.js";
import SingleAlbum from "./components/SingleAlbum.js";
import SingleUser from "./components/User";
import { Login, Signup } from "./components/AuthForm";
import Cart from "./components/Cart";
import AllUsers from "./components/Admin/AllUsers";
import AdminAllAlbums from "./components/Admin/AdminAllAlbums";
import EditAlbum from "./components/Admin/EditAlbum";
import AddNewAlbum from "./components/Admin/AddNewAlbum";
import { fetchSingleUser } from "./store/singleUser";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getSingleUser(this.props.id);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route exact path="/albums/:albumId" component={SingleAlbum} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route exact path="/cart/" component={Cart} />
            <div>
              {this.props.user.isAdmin ? (
                <div>
                  <Route exact path="/admin/allusers/" component={AllUsers} />
                  <Route
                    exact
                    path="/admin/allalbums/"
                    component={AdminAllAlbums}
                  />
                  <Route exact path="/admin/addalbum" component={AddNewAlbum} />
                  <Route
                    exact
                    path="/admin/albums/:albumId"
                    component={EditAlbum}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* <Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route exact path="/albums" component={AllAlbums} />
            <Route exact path="/albums/:albumId" component={SingleAlbum} />
            <Route exact path="/cart/" component={Cart} />
            {/* <Redirect to="/home" /> */}
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    id: state.auth.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getSingleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
