import React, { Component } from "react";
import { connect } from "react-redux";




class Admin extends Component {

  componentDidMount() {
    this.getAllShows();
  }

  getAllShows() {
    this.props.dispatch({
      type: "FETCH_ALL_SHOWS"
    });
  }

  render() {
    return <p>This is the Admin Page!</p>;
  }
}

export default connect()(Admin);
