import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

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

class EventPage extends Component {
  state = {
    addressShowing: false
  };

  addressVenueChange = () => {
    this.setState({
      addressShowing: !this.state.addressShowing
    });
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.match.params.id
    });
  }

  getGuests() {
    this.props.dispatch({
      type: "FETCH_GUESTS",
      payload: this.props.match.params.id
    });
  }

  render() {
    const addressShowing = this.state.addressShowing;
    return (
      <div>
        <h1>EVENT PAGE</h1>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <p>
                    <MusicVideo />
                  </p>
                  <br />
                  <Navigation />
                  <br />
                </TableCell>
                <TableCell>
                  <p>{this.props.store.band_name}</p>
                  <p onClick={this.addressVenueChange}>
                    {addressShowing
                      ? this.props.store.location_name
                      : `${this.props.store.number_street} ${this.props.store.city}, ${this.props.store.state}`}
                  </p>
                  <p>
                    {this.props.store.time_doors} / {this.props.store.time_show}
                  </p>
                  <p>
                    <Moment format='MM/DD/YYYY'>{this.props.store.date}</Moment>
                  </p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store: store.eventDetailsReducer
});

export default connect(mapStateToProps)(EventPage);
