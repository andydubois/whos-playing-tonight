import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class ViewAddList extends Component {
  getBandDetails = action => {
    this.props.dispatch({
      type: "FETCH_BAND_DETAILS",
      payload: this.props.band.id
    });
    this.props.dispatch({
      type: "FETCH_PAST_SHOWS",
      payload: this.props.band.id
    });
    this.props.dispatch({
      type: "FETCH_FUTURE_SHOWS",
      payload: this.props.band.id
    });
    this.props.history.push(`/bands/${this.props.band.id}`);
  };

  render() {
    return (
      <TableRow onClick={this.getBandDetails} key={this.props.band.id}>
        <TableCell key={this.props.band.id}>{this.props.band.band_name}</TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(ViewAddList));
