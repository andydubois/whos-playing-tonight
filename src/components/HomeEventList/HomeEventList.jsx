import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class HomeEventList extends Component {
  //retrieves details for movie with specified ID and saves in reducer

  // goToDetails = action => {
  //   //fetches detail and genre info before routing to detail page
  //   this.getDetails();
  //   this.getGenres();
  //   this.props.history.push(`/details/${this.props.movie.id}`);
  //   console.log(`/details/{this.props.movie.id}`);
  // };

  showDetailsClick = action => {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.show.id
    });
    this.props.history.push(`/event/${this.props.show.id}`);
  };

  getBandDetails = action => {
    this.props.dispatch({
      type: "FETCH_BAND_DETAILS",
      payload: this.props.show.band_id
    });
    this.props.dispatch({
      type: "FETCH_PAST_SHOWS",
      payload: this.props.show.band_id
    });
    this.props.dispatch({
      type: "FETCH_FUTURE_SHOWS",
      payload: this.props.show.band_id
    });
    this.props.history.push(`/bands/${this.props.show.band_id}`);
  };

  render() {
    return (
      <TableRow key={this.props.show.id}>
        <TableCell className="homeTable" onClick={this.getBandDetails}>{this.props.show.band_name}</TableCell>
        <TableCell>
          <Moment format='MM/DD/YYYY'>{this.props.show.date}</Moment>
        </TableCell>
        <TableCell>
          <Button
            onClick={this.showDetailsClick}
            variant='contained'
            color='primary'>
            Show Details
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(HomeEventList));
