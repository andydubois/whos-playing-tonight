import React, { Component } from "react";
import { connect } from "react-redux";

class AddShowsPage extends Component {
  render() {
    return <p>This is the Add show Page!</p>;
  }
}

export default connect()(AddShowsPage);
