import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ViewAddList extends Component {
  getBandDetails = action => {
    this.props.dispatch({
      type: "FETCH_BAND_DETAILS",
      payload: this.props.band.id
    });
    this.props.dispatch({
      type: "FETCH_PAST_SHOWS",
      payload: this.props.band.id
    })
    this.props.dispatch({
      type: "FETCH_FUTURE_SHOWS",
      payload: this.props.band.id
    });
    this.props.history.push(`/bands/${this.props.band.id}`);
  };

  render() {
    return (
      <li key={this.props.band.id} onClick={this.getBandDetails}>
        {this.props.band.band_name}
      </li>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(ViewAddList));
