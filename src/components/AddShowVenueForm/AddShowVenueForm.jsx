import React, { Component } from "react";
import { connect } from "react-redux";

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

class AddShowVenueForm extends Component {
  state = {
    newAddress: false,
    snackBarVenueOpen: false,
    address: {
      numberStreet: "",
      city: "",
      state: "",
      zip: "",
      venue_name: ""
    }
  };

  handleSnackVenueClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarVenueOpen: false });
  };

  showVenueForm = () => {
    this.setState({ newAddress: !this.state.newAddress });
  };

  handleAddressChange = (propertyName, event) => {
    this.setState({
      address: {
        ...this.state.address,
        [propertyName]: event.target.value
      }
    });
    console.log(this.state);
  };

  componentDidMount() {}

  submitNewVenue = event => {
    // event.preventDefault();
    // this.props.dispatch({
    //   type: "ADD_VENUE",
    //   payload: this.state.address
    // });
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={this.showVenueForm}>
          {this.state.newAddress ? "Hide Form" : "Add New Venue"}
        </Button>
        <div className={this.state.newAddress ? null : "hidden"}>
          <CssBaseline />
          <form className='addShowForm'>
            <div className='form-group'>
              <label>
                If venue is not in dropdown, please enter address and venue name
                below, submit it, and then select it from the dropdown above.
              </label>
              <small className='form-text text-muted'>Give venue a name</small>

              <input
                type='text'
                className='form-control'
                placeholder='Venue name here'
                onChange={event =>
                  this.handleAddressChange("venue_name", event)
                }
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>Street and #</small>
              <input
                type='text'
                className='form-control'
                placeholder='123 Fake St'
                onChange={event =>
                  this.handleAddressChange("numberStreet", event)
                }
                value={this.state.address.numberStreet}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>City</small>
              <input
                type='text'
                className='form-control'
                placeholder='Fakesville'
                onChange={event => this.handleAddressChange("city", event)}
                value={this.state.address.city}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>State</small>
              <input
                type='text'
                className='form-control'
                placeholder='MN'
                onChange={event => this.handleAddressChange("state", event)}
                value={this.state.address.state}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>Zip Code</small>
              <input
                type='text'
                className='form-control'
                placeholder='55555'
                onChange={event => this.handleAddressChange("zip", event)}
                value={this.state.address.zip}
              />
            </div>
            <Button
              variant='contained'
              color='primary'
              onClick={this.submitNewVenue}>
              Submit New Venue
            </Button>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.snackBarVenueOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackVenueClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id='message-id'>New Venue Added to List!</span>}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                className={classes.close}
                onClick={this.handleSnackVenueClose}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

// this allows us to use <App /> in index.js
export default withStyles(styles)(connect(mapStateToProps)(AddShowVenueForm));
