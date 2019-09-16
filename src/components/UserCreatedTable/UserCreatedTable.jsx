import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class UserCreatedTable extends Component {
  //retrieves details for movie with specified ID and saves in reducer

  // goToDetails = action => {
  //   //fetches detail and genre info before routing to detail page
  //   this.getDetails();
  //   this.getGenres();
  //   this.props.history.push(`/details/${this.props.movie.id}`);
  //   console.log(`/details/{this.props.movie.id}`);
  // };

  deleteShow = (action) => {
    this.props.dispatch({
      type: "DELETE_USER_SHOW",
      payload: this.props.show
    });
  }

  render() {



    return (
      <TableRow onClick={this.showDetailsClick} key={this.props.show.id}>
        <TableCell>{this.props.show.band_name}</TableCell>
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
          <Button
            onClick={this.deleteShow}
            variant='contained'
            color='secondary'>
            Delete Show
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withRouter(connect(mapStateToProps)(UserCreatedTable));
