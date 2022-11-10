//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSingleAlbum } from "../store/singleAlbum";

export class SingleAlbum extends React.Component {
  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.getSingleAlbum(albumId);
  }

  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.singleAlbum ? (
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
              </div>
            </div>
          </div>
        ) : (
          <div>404 No Album Here</div>
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
  };
};

export default connect(mapState, mapDispatch)(SingleAlbum);
