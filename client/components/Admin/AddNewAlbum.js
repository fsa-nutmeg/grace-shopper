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
      <div>
        <h1 className="add-album"> ADD NEW ALBUM FORM</h1>
        <div className="login-card">
          <form
            method="POST"
            action="/allalbums"
            id="new-album-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title">Enter New Album Title: </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Album Title"
              onChange={handleChange}
              value={title}
            />
            <label htmlFor="address">Enter New Album's Artist: </label>
            <input
              type="text"
              name="artistName"
              required
              placeholder="Artist Name"
              onChange={handleChange}
              value={artistName}
            />
            <label htmlFor="description">Enter Description of New Album:</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={description}
            />
            <label htmlFor="image">
              Enter the Url of The Album Cover for the New Album:
            </label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
              value={image}
            />
            <label htmlFor="price">Enter Price of New Album:</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={price}
            />
            <label htmlFor="quantity">
              Enter In Stock Quantity of New Album:
            </label>
            <input
              type="text"
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
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  createAlbum: (singleAlbum) => dispatch(createAlbum(singleAlbum, history)),
});

export default connect(null, mapDispatch)(AddNewAlbum);
