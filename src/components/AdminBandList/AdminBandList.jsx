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
        "Once deleted, this will delete the BAND as well as ALL SHOWS associated with the band PERMANENTLY.",
      icon: "warning",
      buttons: true,
      buttons: ["Cancel", "Yes, delete them all."],
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch({
          type: "DELETE_BAND",
          payload: this.props.band
        });
        swal("Poof! Your imaginary file has been deleted!", {
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
          <Button variant='contained' color='danger' onClick={this.deleteBand}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(connect()(AdminBandList));
