import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class AdminPageList extends Component {
  componentDidMount() {
    this.getBandList();
  }

  getBandList() {
    this.props.dispatch({
      type: "FETCH_BANDS"
    });
  }

  deleteBand = () => {
      this.props.dispatch({
          type: "DELETE_BAND",
          payload: this.props.band.id
      });
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.band.band_name}</TableCell>
        <TableCell>
          <Button variant='contained' color='danger' onClick={this.deleteBand}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AdminPageList));
