import React, { Component } from "react";
import { connect } from "react-redux";

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
import AdminPageList from "../AdminPageList/AdminPageList"
import AdminBandList from "../AdminBandList/AdminBandList"

class Admin extends Component {
  componentDidMount() {
    this.getAllShows();
  }

  getAllShows() {
    this.props.dispatch({
      type: "FETCH_ALL_SHOWS"
    });
  }

  render() {
    return (
      <Paper>
        <h2>All Shows</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Band</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.allShowsReducer.map(show => {
              return <AdminPageList show={show} />;
            })}
          </TableBody>
        </Table>
        <h2>All Bands</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Band</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.viewAddBandsReducer.map(band => {
              return <AdminBandList band={band} />;
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(Admin);
