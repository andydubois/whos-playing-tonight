import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MusicVideo from "@material-ui/icons/MusicVideo";
import Navigation from "@material-ui/icons/Navigation";
import Check from "@material-ui/icons/Check";

class AdminPageList extends Component {
  componentDidMount() {
    this.getAllShows();
  }

  getAllShows() {
    this.props.dispatch({
      type: "FETCH_ALL_SHOWS"
    });
  }

  goToEditPage = () => {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.show.id
    });
    this.props.history.push(`/editShow/${this.props.show.id}`);
  };

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.show.band_name}</TableCell>
        <TableCell>
          <Moment format='MM/DD/YYYY'>{this.props.show.date}</Moment>
        </TableCell>
        <TableCell>
          <Button variant='contained' color='danger'>
            Delete
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={this.goToEditPage}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AdminPageList));
