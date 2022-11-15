import React from "react";
import { connect } from "react-redux";
import { createAlbum } from "../../store/singleAlbum";

export class AddNewAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      artistName: "",
      description: "",
      image: "",
      price: "",
      quantity: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createAlbum({ ...this.state });
  }
  render() {
    const { title, artistName, description, image, price, quantity } =
      this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className="newalbum">
        <p className="newalbumtitle"> ADD A NEW ALBUM:</p>
        <form
          method="POST"
          action="/allalbums"
          id="new-album-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">Enter New Album TITLE: </label>
          <input
            name="title"
            required
            placeholder="album title"
            onChange={handleChange}
            value={title}
          />
          <label htmlFor="address">Enter Album's Artist: </label>
          <input
            name="artistName"
            required
            placeholder="Artist Name"
            onChange={handleChange}
            value={artistName}
          />
          <label htmlFor="description">Enter Description of New Album:</label>
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
          <label htmlFor="image">
            Enter the Url of Photo of the New Album:
          </label>
          <input
            name="image"
            placeholder="Add An Image"
            onChange={handleChange}
            value={image}
          />
          <label htmlFor="price">Enter Price of New Album:</label>
          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={price}
          />
          <label htmlFor="quantity">Enter Quantity of New Album:</label>
          <input
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            value={quantity}
          />
          <div className="form-example">
            <input type="submit" value="Submit!" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createAlbum: (singleAlbum) => dispatch(createAlbum(singleAlbum, history)),
});

export default connect(null, mapDispatch)(AddNewAlbum);
