import React, { Component } from "react";
import { connect } from "react-redux";

class EventPage extends Component {
  render() {
    return (
    <div>
        <h1>EVENT PAGE</h1>
    </div>
    )
  }
}

export default connect()(EventPage);
