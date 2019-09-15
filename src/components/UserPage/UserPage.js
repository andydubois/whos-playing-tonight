import React, {Component} from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { CssBaseline } from "@material-ui/core";


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <h1 id='welcome'>Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className='log-in' />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
