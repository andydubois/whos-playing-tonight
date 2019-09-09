import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class EventPage extends Component {
  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.match.params.id
    });
  }

  render() {
    return (
      <div>
        <h1>EVENT PAGE</h1>
        <p>{this.props.store.eventDetailsReducer.band_name}</p>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(EventPage);
