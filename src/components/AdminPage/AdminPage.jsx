import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AdminPageList from "../AdminPageList/AdminPageList";
import AdminBandList from "../AdminBandList/AdminBandList";
import { CssBaseline } from "@material-ui/core";

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
    return this.props.store.user.clearance < 2 ? (
      <p>404 error</p>
    ) : (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h2>ADMIN</h2>
        <br />
        <h5>All Shows</h5>
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
        <h5>All Bands</h5>
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
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(Admin);
