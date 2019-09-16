import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class AdminPageList extends Component {
  componentDidMount() {
    this.getAllShows();
    this.getBandList();
  }

  getAllShows() {
    this.props.dispatch({
      type: "FETCH_ALL_SHOWS"
    });
  }

  getBandList() {
    this.props.dispatch({
      type: "FETCH_BANDS"
    });
  }

  goToEditPage = () => {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.show.id
    });
    this.props.history.push(`/editShow/${this.props.show.id}`);
  };

  deleteShow = action => {
    swal({
      title: "Are you sure?",
      text:
        "Are you sure you wanted to permanently delete this show from the database?",
      icon: "warning",
      buttons: true,
      buttons: ["Cancel", "Yes, delete the band"],
      dangerMode: true,
      className: "sweetAlert"
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch({
          type: "DELETE_ADMIN_SHOW",
          payload: this.props.show
        });
        swal("The band will rock no more!", {
          icon: "success"
        });
      } else {
        swal("No shows were hurt in the making of this alert.");
      }
    });
  };

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.show.band_name}</TableCell>
        <TableCell>
          <Moment format='MM/DD/YYYY'>{this.props.show.date}</Moment>
        </TableCell>
        <TableCell>
          <Button
            variant='contained'
            color='secondary'
            onClick={this.deleteShow}>
            Delete
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={this.goToEditPage}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AdminPageList));
