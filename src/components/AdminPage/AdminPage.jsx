import React, { Component } from "react";
import { connect } from "react-redux";

class Admin extends Component {
  render() {
    return <p>This is the Admin Page!</p>;
  }
}

export default connect()(Admin);
