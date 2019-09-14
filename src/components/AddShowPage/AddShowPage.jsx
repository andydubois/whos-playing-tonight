import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI components
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

class AddShowsPage extends Component {
  state = {
    newAddress: false,
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

  submitNewShow = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_SHOW",
      payload: this.state.showInfo
    });
  };

  submitNewVenue = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_VENUE",
      payload: this.state.address
    });
  };

  componentDidMount() {
    this.getVenues();
    this.getBandList();
  }

  getVenues() {
    this.props.dispatch({
      type: "FETCH_VENUES"
    });
  }

  getBandList() {
    this.props.dispatch({
      type: "FETCH_BANDS"
    });
  }

  handleChange = (propertyName, event) => {
    this.setState({
      showInfo: {
        ...this.state.showInfo,
        [propertyName]: event.target.value
      }
    });
    console.log(this.state);
  };

  handleAddressChange = (propertyName, event) => {
    this.setState({
      address: {
        ...this.state.showInfo,
        [propertyName]: event.target.value
      }
    });
    console.log(this.state);
  };

  showVenueForm = () => {
    this.setState({ newAddress: !this.state.newAddress });
  };

  render() {
    return (
      <div>
        <CssBaseline />
        <h1>Add New Show</h1>
        <form className='addShowForm' onSubmit={this.submitNewShow}>
          <div className='form-group'>
            <label>Date of Show</label>
            <input
              type='date'
              className='form-control'
              onChange={event => this.handleChange("showDate", event)}
            />
          </div>
          <div className='form-group'>
            <label>Doors time?</label>
            <input
              type='time'
              className='form-control'
              placeholder='7:00 pm'
              onChange={event => this.handleChange("doorTime", event)}
            />
          </div>
          <div className='form-group'>
            <label>Show start time?</label>
            <input
              type='time'
              className='form-control'
              placeholder=' time'
              onChange={event => this.handleChange("showTime", event)}
            />
            <small className='form-text text-muted'>
              -Enter band name above. <br />
              -Click on band names to travel to band pages and add music links
              for each.
            </small>
          </div>
          <div className='form-group'>
            <label>Venue Selection</label>
            <select
              className='form-control'
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
          </div>

          <div className='form-group'>
            <label>Band Selection</label>
            <select
              className='form-control'
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

          <Button type='submit' variant='contained' color='primary'>
            Submit Event
          </Button>
        </form>
        <Button
          variant='contained'
          color='primary'
          onClick={this.showVenueForm}>
          {this.state.newAddress ? "Hide Form" : "Add New Venue"}
        </Button>
        <div className={this.state.newAddress ? null : "hidden"}>
          <form className='addShowForm' onSubmit={this.submitNewVenue}>
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
                disabled={this.state.showInfo.venueId === "" ? false : true}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>Street and #</small>
              <input
                type='text'
                className='form-control'
                placeholder='123 Fake St'
                onChange={event => this.handleAddressChange("street", event)}
                disabled={this.state.showInfo.venueId === "" ? false : true}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>City</small>
              <input
                type='text'
                className='form-control'
                placeholder='Fakesville'
                onChange={event => this.handleAddressChange("city", event)}
                disabled={this.state.showInfo.venueId === "" ? false : true}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>State</small>
              <input
                type='text'
                className='form-control'
                placeholder='MN'
                onChange={event => this.handleAddressChange("state", event)}
                disabled={this.state.showInfo.venueId === "" ? false : true}
              />
            </div>
            <div className='form-group'>
              <small className='form-text text-muted'>Zip Code</small>
              <input
                type='text'
                className='form-control'
                placeholder='55555'
                onChange={event => this.handleAddressChange("zip", event)}
                disabled={this.state.showInfo.venueId === "" ? false : true}
              />
            </div>
            <Button type='submit' variant='contained' color='primary'>
              Submit New Venue
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(AddShowsPage);
