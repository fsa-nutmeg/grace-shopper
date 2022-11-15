//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchSingleAlbum,
  deleteAlbum,
  updateAlbum,
} from "../../store/singleAlbum";

export class EditAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artistName: "",
      description: "",
      quantity: "",
      price: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    console.log("evt.target.name", evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateAlbum({ ...this.props.singleAlbum, ...this.state });
  }

  componentDidMount() {
    const albumId = this.props.match.params.albumId;
    this.props.getSingleAlbum(albumId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleAlbum.id !== this.props.singleAlbum.id) {
      this.setState({
        title: this.props.singleAlbum.title || "",
        artistName: this.props.singleAlbum.artistName || "",
        description: this.props.singleAlbum.description || "",
        quantity: this.props.singleAlbum.quantity || "",
        price: this.props.singleAlbum.price || "",
      });
    }
  }

  render() {
    const { title, artistName, description, quantity, price } = this.state;

    const { handleSubmit, handleChange } = this;

    return (
      <div>
        {this.props.singleAlbum.title ? (
          <div>
            <div id="single-singleAlbum-detail">
              <div>
                <img
                  src={this.props.singleAlbum.image}
                  width="auto"
                  height="400px"
                />
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Title:</label>
                  <input
                    name="title"
                    onChange={handleChange}
                    type="text"
                    id="single-singleAlbum-detail"
                    defaultValue={title}
                  />
                  <label htmlFor="artistName">Artist:</label>
                  <input
                    name="artistName"
                    onChange={handleChange}
                    type="text"
                    id="single-singleAlbum-detail"
                    defaultValue={artistName}
                  />

                  <label htmlFor="description">Description:</label>
                  <input
                    name="description"
                    onChange={handleChange}
                    type="text"
                    id="single-singleAlbum-detail"
                    defaultValue={description}
                    cols="100"
                    rows="5"
                  />

                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    name="quantity"
                    onChange={handleChange}
                    type="text"
                    id="single-singleAlbum-detail"
                    defaultValue={quantity}
                  />

                  <label htmlFor="price">Price:</label>
                  <input
                    name="price"
                    onChange={handleChange}
                    type="text"
                    id="single-singleAlbum-detail"
                    defaultValue={price}
                  />
                  <button type="submit">Submit Changes</button>
                </form>
                <form onSubmit={(ev) => ev.preventDefault()}>
                  <button
                    type="submit"
                    onClick={(event) => {
                      if (window.confirm("Are you sure?")) {
                        event.preventDefault();
                        this.props.deleteAlbum(this.props.singleAlbum.id);
                      }
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

const mapDispatch = (dispatch, { history }) => {
  return {
    getSingleAlbum: (id) => dispatch(fetchSingleAlbum(id)),
    deleteAlbum: (id) => dispatch(deleteAlbum(id)),
    updateAlbum: (singleAlbum) => dispatch(updateAlbum(singleAlbum, history)),
  };
};

export default connect(mapState, mapDispatch)(EditAlbum);
