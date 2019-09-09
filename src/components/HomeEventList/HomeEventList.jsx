import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

class HomeEventList extends Component {
  //retrieves details for movie with specified ID and saves in reducer

  goToDetails = action => {
    //fetches detail and genre info before routing to detail page
    this.getDetails();
    this.getGenres();
    this.props.history.push(`/details/${this.props.movie.id}`);
    console.log(`/details/{this.props.movie.id}`);
  };

  eventClick() {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS"
    });
  }

  render() {
    return (
      <li key={this.props.show.id}>
        {this.props.show.band_name}
        <br />
        <Moment format='MM/DD/YYYY'>{this.props.show.date}</Moment>
      </li>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(HomeEventList));
