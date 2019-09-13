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


//Components
import HomeEventList from "../HomeEventList/HomeEventList";

class Home extends Component {
  componentDidMount() {
    //refreshes movie data every time page is loaded
    this.getShows();
  }

  getShows() {
    this.props.dispatch({
      type: "FETCH_HOME_INFO"
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <Paper>
          <h5>{this.props.store.homeReducer.length} shows to see!</h5>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Band</TableCell>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.store.homeReducer.map(show => {
                return <HomeEventList show={show} />;
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(Home);
