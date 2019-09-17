import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

//Material UI Components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class AdminBandList extends Component {


  deleteBand = () => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted,  the BAND as well as ALL SHOWS, and MUSIC associated with the band will be deleted PERMANENTLY.",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete them all."],
      dangerMode: true,
      className: "sweetAlert"
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch({
          type: "DELETE_BAND",
          payload: this.props.band
        });
        swal("The band will rock no more!", {
          icon: "success"
        });
      } else {
        swal("No bands or shows were hurt in the making of this alert.");
      }
    });
  };

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.band.band_name}</TableCell>
        <TableCell>
          <Button variant='contained' color='secondary' onClick={this.deleteBand}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AdminBandList));
