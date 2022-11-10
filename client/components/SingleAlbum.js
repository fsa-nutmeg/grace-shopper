//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSingleAlbum, deleteAlbum } from "../store/singleAlbum";

export class SingleAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleAlbum: {},
    };
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.getSingleAlbum(albumId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.singleAlbum !== this.state.singleAlbum) {
      const albumId = this.props.match.params.albumId;
      this.props.getSingleAlbum(albumId);
      this.setState({
        singleAlbum: this.props.singleAlbum,
      });
    }
  }

  render() {
    console.log("props", this.props);
    console.log("state", this.state);

    return (
      <div>
        {this.props.singleAlbum.title ? (
          <div>
            <div>
              {this.props.singleAlbum.staffPick ? (
                <div className="staffPick">STAFF PICK</div>
              ) : (
                <div></div>
              )}
            </div>
            <div id="single-singleAlbum-detail">
              <div>
                <p>Title:</p>
                <img
                  src={this.props.singleAlbum.image}
                  width="auto"
                  height="400px"
                />
                <p className="single-singleAlbum-detail">
                  {this.props.singleAlbum.title}
                </p>
                <p>Artist:</p>
                <p className="single-singleAlbum-detail">
                  {this.props.singleAlbum.artistName}
                </p>
                <p className="single-singleAlbum-detail">
                  {this.props.singleAlbum.description}
                </p>
                <p>Quantity:</p>
                <p className="single-singleAlbum-detail">
                  {this.props.singleAlbum.quantity}
                </p>
                <p>Tracks:</p>
                <p className="single-singleAlbum-detail">
                  {this.props.singleAlbum.tracks}
                </p>
                <form onSubmit={(ev) => ev.preventDefault()}>
                  <button
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      this.props.deleteAlbum(this.props.singleAlbum.id);
                    }}
                  >
                    REMOVE ALBUM FROM CATALOG
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div>Album Has Been Removed From The Catalog...Sorry </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleAlbum: state.singleAlbum,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleAlbum: (id) => dispatch(fetchSingleAlbum(id)),
    deleteAlbum: (id) => dispatch(deleteAlbum(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
