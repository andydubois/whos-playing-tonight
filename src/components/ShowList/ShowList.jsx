import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

class ShowList extends Component {
  showDetailsClick = action => {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.show.id
    });
    this.props.history.push(`/event/${this.props.show.id}`);
  };

  render() {
    return (
      <li key={this.props.show.id}>
        <p onClick={this.showDetailsClick}>
          {this.props.show.location_name}{" "}
          <Moment format='MM/DD/YYYY'>{this.props.show.date}</Moment>
        </p>
      </li>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(ShowList));
