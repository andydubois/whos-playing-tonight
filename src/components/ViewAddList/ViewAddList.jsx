import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class ViewAddList extends Component {
  state = {
    snackBarOpen: false
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  getBandDetails = action => {
    //clears old videos, so videos don't show up for the wrong band
    this.props.dispatch({
      type: "CLEAR_BAND_DETAILS"
    });
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
        <TableCell key={this.props.band.id}>
          {this.props.band.band_name}
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(ViewAddList));
