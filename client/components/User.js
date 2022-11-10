//[ ] build this component
import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/singleUser";
import { Link } from "react-router-dom";

export class SingleUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.getSingleUser(userId);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <div>
            <div>
              {this.props.user.isAdmin ? <div>ADMIN</div> : <div></div>}
            </div>
            <div id="single-user-detail">
              <div>
                <p>Email:{this.props.user.email}</p>
                <p>Address:{this.props.user.address}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>404 No User Here</div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
