import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import HomeEventList from "../HomeEventList/HomeEventList"

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CssBaseline } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

componentDidMount() {
   this.props.dispatch({
     type: "FETCH_USER"
   });
  this.getHistory();
}

getHistory = () => {

  this.props.dispatch({
    type: "FETCH_HISTORY",
    payload: this.props.store.user.id
  });
  console.log(this.props.store.user.id)
}


  render() {
    return (
      <div>
        <CssBaseline />
        <h1 id='welcome'>Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className='log-in' />
        <div>
          <h4>Show's that you have coming up!</h4>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.store.userHistoryReducer.map(show => {
                return <HomeEventList show={show} />;
              })}
            </TableBody>
          </Table>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <h4>Show History</h4>
                <p></p>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        (Click show for further details on each)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.store.viewAddBandsReducer.map(band => {
                      return;
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className='col-6'>
                <h4>Show's You've Added</h4>
                {/* <TextField label="New Band Here" fullWidth/>
              <TextField label="YT link to music here"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
