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
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
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

            {/* <Redirect to="/home" /> */}
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
