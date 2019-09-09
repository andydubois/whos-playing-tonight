import React, { Component } from "react";
import { connect } from "react-redux";

class BandPage extends Component {
  render() {
    return <p>This is the Band Page!</p>;
  }
}

export default connect()(BandPage);
