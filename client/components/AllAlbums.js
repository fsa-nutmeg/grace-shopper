//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchAlbums } from "../store/allAlbums";

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
      <div>
        <div className="allAlbums">
          {albums.length ? (
            albums.map((album) => (
              <div key={album.id}>
                <form onSubmit={(ev) => ev.preventDefault()}></form>
                <Link to={`/albums/${album.id}`} key={album.id}>
                  <div className="specificAlbum" key={album.id}>
                    <p>{album.title}</p>
                    <img src={album.image} width="auto" height="200" />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No albums...</p>
          )}
        </div>
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
