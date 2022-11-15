import React from "react";
import { connect } from "react-redux";
import AllAlbums from "./AllAlbums";
import ImgCarousel from "./Carousel";

/**
 * COMPONENT
 */
export const Home = () => {
  // const { username } = props;

  return (
    <div>
      <ImgCarousel />
      {/* <AllAlbums /> */}
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
