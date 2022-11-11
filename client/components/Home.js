import React from "react";
import { connect } from "react-redux";
import App from "../newAuth/App";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <App />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    user: state.user,
  };
};

export default connect(mapState)(Home);
