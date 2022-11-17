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

import { fetchAlbums } from "../store/allAlbums";
import Footer from "./Footer";

export class AllAlbums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: "",
    };
  }
  componentDidMount() {
    this.props.getAlbums();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.albums.length !== this.state.albums.length) {
      this.props.getAlbums();
      this.setState({
        albums: this.props.albums,
      });
    }
  }
  render() {
    const albums = this.props.albums;
    return (
      <div className="home">
        <div className="allAlbums-title"></div>
        <div className="allAlbums">
          {albums.length ? (
            albums.map((album) => (
              <div key={album.id}>
                <form onSubmit={(ev) => ev.preventDefault()}></form>
                <Link to={`/albums/${album.id}`} key={album.id}>
                  <div className="specificAlbum" key={album.id}>
                    <MDBCard className="albums-view" style={{ width: "18rem" }}>
                      <MDBCardImage
                        src={album.image}
                        position="top"
                        alt="..."
                      />
                      <MDBCardBody>
                        <MDBCardTitle className="album-title">
                          {album.title}
                        </MDBCardTitle>
                        <MDBCardText className="price">{`$${album.price}`}</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No albums...</p>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapState = (state) => {
  return { albums: state.albums };
};

const mapDispatch = (dispatch) => {
  return {
    getAlbums: () => dispatch(fetchAlbums()),
  };
};

export default connect(mapState, mapDispatch)(AllAlbums);
