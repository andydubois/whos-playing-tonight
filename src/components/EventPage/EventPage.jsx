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
import Check from "@material-ui/icons/Check";
import { CssBaseline } from "@material-ui/core";

class EventPage extends Component {
  state = {
    rsvp: {
      userId: this.props.store.user.id,
      eventId: this.props.match.params.id
    },
    addressShowing: false
  };

  addressVenueChange = () => {
    this.setState({
      addressShowing: !this.state.addressShowing
    });
  };

  componentDidMount() {
    this.getDetails();
    this.getGuests();
  }

  //gets details about event being displayed
  getDetails() {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.match.params.id
    });
  }

  //function to get guests going to event
  getGuests() {
    this.props.dispatch({
      type: "FETCH_GUESTS",
      payload: this.props.match.params.id
    });
  }

  rsvpForEvent = () => {
    this.props.dispatch({
      type: "RSVP_EVENT",
      payload: this.state.rsvp
    });
    this.getGuests();
  };

  notGoingToEvent = () => {
    this.props.dispatch({
      type: "NOT_GOING_TO_EVENT",
      payload: this.state.rsvp
    });
    this.getGuests();
  }

  render() {
    //variable to check if addressShowing in state is true or false for conditional render of venue name or address
    const addressShowing = this.state.addressShowing;

    let guestList = this.props.store.eventGuestReducer.map(guest => {
      return (
        <li key={guest.username}>
          {guest.username}
          <Check />
        </li>
      );
    });

    if (guestList.includes(this.props.store.user.username)) {
      console.log('YEEEEEEEAH IT WORKS');
    }

    return (
      <div>
        <CssBaseline />
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
                  <p>{this.props.store.eventDetailsReducer.band_name}</p>
                  <p onClick={this.addressVenueChange}>
                    {addressShowing
                      ? this.props.store.eventDetailsReducer.location_name
                      : `${this.props.store.eventDetailsReducer.number_street} ${this.props.store.eventDetailsReducer.city}, ${this.props.store.eventDetailsReducer.state}`}
                  </p>
                  <p>
                    {this.props.store.eventDetailsReducer.time_doors} /{" "}
                    {this.props.store.eventDetailsReducer.time_show}
                  </p>
                  <p>
                    <Moment format='MM/DD/YYYY'>
                      {this.props.store.eventDetailsReducer.date}
                    </Moment>
                  </p>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ul>{guestList}</ul>
          <Button onClick={this.rsvpForEvent}>RSVP</Button>
          <Button onClick={this.notGoingToEvent}>NOT GOING ANYMORE</Button>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(EventPage);
