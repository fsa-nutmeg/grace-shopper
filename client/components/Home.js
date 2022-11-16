import React from "react";
import { connect } from "react-redux";
// import AllAlbums from "./AllAlbums";
import ImgCarousel from "./Carousel";
import RapAlbums from "./Rap";
import AllAlbums from "./TopAlbums";
import PopAlbums from "./Pop";
import CountryAlbums from "./Country";
import Footer from "./Footer";

/**
 * COMPONENT
 */
export const Home = () => {
  // const { username } = props;

  return (
    <div className="home">
      <ImgCarousel />
      <AllAlbums />
      <RapAlbums />
      <PopAlbums />
      <CountryAlbums />
      <Footer />
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
