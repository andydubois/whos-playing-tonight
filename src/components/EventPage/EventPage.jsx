import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import MusicVideo from "@material-ui/icons/MusicVideo";
import Navigation from "@material-ui/icons/Navigation";
import Alarm from "@material-ui/icons/Alarm";
import Check from "@material-ui/icons/Check";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DoorIcon from "../../icons/Door.js";

const styles = theme => ({
  icon: {
    paddingRight: "5px",
    display: "inline",
    color: "white",
    height: "1em"
  }
});

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
    this.props.store.eventGuestReducer.map(guest => {
      if (guest.username == this.props.store.user.username) {
        return console.log("THE USER NAMES MATCH!");
      } else {
        return console.log("NO DICE");
      }
    });
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
    console.log("RSVP sent", this.state.rsvp);
    this.getGuests();
  };

  notGoingToEvent = () => {
    this.props.dispatch({
      type: "NOT_GOING_TO_EVENT",
      payload: this.state.rsvp
    });
    this.getGuests();
  };

  render() {
    const { classes } = this.props;
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

    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>EVENT PAGE</h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className='eventTableCell'>
                <p>
                  <MusicVideo className={classes.icon} />
                  {this.props.store.eventDetailsReducer.band_name}
                </p>
                <p onClick={this.addressVenueChange}>
                  <Navigation className={classes.icon} />
                  {addressShowing
                    ? this.props.store.eventDetailsReducer.location_name
                    : `${this.props.store.eventDetailsReducer.number_street} ${this.props.store.eventDetailsReducer.city}, ${this.props.store.eventDetailsReducer.state}`}
                </p>
                <p>
                  <Alarm />
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
        <h6 className="guestHeader">Attending</h6>
        <ul className='guestList'>{guestList}</ul>
        <Button onClick={this.rsvpForEvent} variant='contained' color='primary'>
          RSVP
        </Button>
        <Button
          onClick={this.notGoingToEvent}
          variant='contained'
          color='secondary'>
          NOT GOING ANYMORE
        </Button>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(EventPage));
