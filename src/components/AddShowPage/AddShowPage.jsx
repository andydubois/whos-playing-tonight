import React, { Component } from "react";
import { connect } from "react-redux";
import AddShowVenueForm from "../AddShowVenueForm/AddShowVenueForm";

//Material UI components
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class AddShowsPage extends Component {
  state = {
    newAddress: false,
    snackBarShowOpen: false,
    showInfo: {
      showDate: "",
      doorTime: "",
      showTime: "",
      venueId: 0,
      bandId: 0
    },
    address: {
      numberStreet: "",
      city: "",
      state: "",
      zip: "",
      venue_name: ""
    }
  };

  componentDidMount() {
    this.getVenues();
    this.getBandList();
  }

  //submits new show info to database
  submitNewShow = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_SHOW",
      payload: this.state.showInfo
    });
    // opens snack bar on click
    this.setState({ snackBarShowOpen: true });
    this.setState({
      showInfo: {
        showDate: "",
        doorTime: "",
        showTime: "",
        venueId: 0,
        bandId: 0
      }
    });
  };

  //sets state to true to reveal snack bar notification
  newShowClick = event => {
    this.setState({ snackBarShowOpen: true });
  };

  //submits new venue info to database
  submitNewVenue = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_VENUE",
      payload: this.state.address
    });
    //opens snack bar on click
    this.setState({ snackBarVenueOpen: true });
    //reset input fields to empty after submission
    this.setState({
      address: {
        numberStreet: "",
        city: "",
        state: "",
        zip: "",
        venue_name: ""
      }
    });
  };

  //close snackbar on a click away

  handleSnackShowClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarShowOpen: false });
  };

  //fetches venues from database
  getVenues() {
    this.props.dispatch({
      type: "FETCH_VENUES"
    });
  }

  //fetches all bands from database
  getBandList() {
    this.props.dispatch({
      type: "FETCH_BANDS"
    });
  }

  //change handle for showInfo in state
  handleChange = (propertyName, event) => {
    this.setState({
      showInfo: {
        ...this.state.showInfo,
        [propertyName]: event.target.value
      }
    });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>Add New</h1>
        <h1>Show</h1>
        <form className='addShowForm' onSubmit={this.submitNewShow}>
          <div className='form-group'>
            <label>Headliner Selection</label>
            <select
              className='form-control dropDownMenu'
              value={this.state.showInfo.bandId}
              onChange={event => this.handleChange("bandId", event)}>
              <option value=''>None</option>
              {this.props.store.viewAddBandsReducer.map(band => {
                return (
                  <option key={band.id} value={band.id}>
                    {band.band_name}
                  </option>
                );
              })}
            </select>
            <small className='form-text text-muted'>
              If band isn't in dropdown, navigate to "View Bands" page to add
              band to list
            </small>
          </div>
          <div className='form-group'>
            <label>Venue Selection</label>
            <select
              className='form-control dropDownMenu'
              value={this.state.showInfo.venueId}
              onChange={event => this.handleChange("venueId", event)}>
              <option value=''>None</option>
              {this.props.store.venueReducer.map(venue => {
                return (
                  <option key={venue.id} value={venue.id}>
                    {venue.location_name}
                  </option>
                );
              })}
            </select>
            <small className='form-text text-muted'>
              If desired venue isn't in dropdown, click the "Add New Venue Form"
              button below, enter venue info, and submit. Venue will now be in
              the dropdown.
            </small>
          </div>
          <AddShowVenueForm />
          <div className='form-group'>
            <label>Date of Show</label>
            <input
              type='date'
              value={this.state.showInfo.showDate}
              onChange={event => this.handleChange("showDate", event)}
            />
          </div>
          <div className='form-group'>
            <label>Doors time?</label>
            <input
              type='time'
              value={this.state.showInfo.doorTime}
              placeholder='7:00 pm'
              onChange={event => this.handleChange("doorTime", event)}
            />
          </div>
          <div className='form-group'>
            <label>Show start time?</label>
            <input
              type='time'
              value={this.state.showInfo.showTime}
              placeholder=' time'
              onChange={event => this.handleChange("showTime", event)}
            />
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={this.newShowClick}>
            Submit Event
          </Button>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.snackBarShowOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackShowClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id='message-id'>New Show Added!</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleSnackShowClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(AddShowsPage));
