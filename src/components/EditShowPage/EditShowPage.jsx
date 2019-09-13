import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

//Material UI components
import Button from "@material-ui/core/Button";
import { throwStatement } from "@babel/types";

class EditShowPage extends Component {
  state = {
    newAddress: false,
    showInfo: {
      showDate: "",
      doorTime: "",
      showTime: "",
      venueId: 0,
      bandId: 0,
      bandEventId: this.props.store.eventDetailsReducer.band_event_id,
      eventId: this.props.match.params.id
    },
    address: {
      numberStreet: "",
      city: "",
      state: "",
      zip: ""
    }
  };

  submitNewShow = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "EDIT_SHOW",
      payload: this.state.showInfo
    });
  };

  componentDidMount() {
    this.getVenues();
    this.getBandList();
    this.getDetails();
  }
  getDetails() {
    this.props.dispatch({
      type: "FETCH_EVENT_DETAILS",
      payload: this.props.match.params.id
    });
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

  showVenueForm = () => {
    this.setState({ newAddress: !this.state.newAddress });
  };

  render() {
    const showDate = (
      <Moment format='MM/DD/YYYY'>
        {this.props.store.eventDetailsReducer.date}
      </Moment>
    );
    let doorTime = `0${this.props.store.eventDetailsReducer.time_doors}`;
    console.log(doorTime);
    let showTime = `0${this.props.store.eventDetailsReducer.time_show}`;
    let venueId = this.props.store.eventDetailsReducer.venue_id;

    return (
      <div>
        <h1>Add New Show</h1>
        <form className='addShowForm' onSubmit={this.submitNewShow}>
          <div className='form-group'>
            <label>Date of Show</label>
            <input
              type='date'
              className='form-control'
              onChange={event => this.handleChange("showDate", event)}
              defaultValue={showDate}
            />
            <small className='form-text text-muted'>
              Previous date was {showDate}
            </small>
          </div>
          <div className='form-group'>
            <label>Doors time?</label>
            <input
              type='time'
              className='form-control'
              placeholder='7:00 pm'
              onChange={event => this.handleChange("doorTime", event)}
              Value={doorTime}
            />
            <small className='form-text text-muted'>
              Previous door time was{" "}
              {this.props.store.eventDetailsReducer.time_doors}
            </small>
          </div>
          <div className='form-group'>
            <label>Show start time?</label>
            <input
              type='time'
              className='form-control'
              placeholder=' time'
              onChange={event => this.handleChange("showTime", event)}
              Value={showTime}
            />
            <small className='form-text text-muted'>
              Previous door time was{" "}
              {this.props.store.eventDetailsReducer.time_show}
            </small>
          </div>
          <div className='form-group'>
            <label>Venue Selection</label>
            <select
              className='form-control'
              onChange={event => this.handleChange("venueId", event)}>
              <option value=''>None</option>
              {this.props.store.venueReducer.map(venue => {
                return { venueId } === venue.id ? (
                  <option key={venue.id} value={venue.id} selected>
                    {venue.location_name}
                  </option>
                ) : (
                  <option key={venue.id} value={venue.id}>
                    {venue.location_name}
                  </option>
                );
              })}
            </select>
            <small className='form-text text-muted'>
              Previous Venue was:{" "}
              {this.props.store.eventDetailsReducer.location_name}
            </small>
          </div>
          <Button
            variant='contained'
            color='primary'
            onClick={this.showVenueForm}>
            {this.state.newAddress ? "Hide Form" : "Add New Venue"}
          </Button>
          <div className={this.state.newAddress ? null : "hidden"}>
            <form className='addShowForm'>
              <div className='form-group'>
                <label>
                  If venue is not in dropdown, please enter address and venue
                  name below, submit it, and then select it from the dropdown
                  above.
                </label>
                <small className='form-text text-muted'>
                  Give venue a name
                </small>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Venue name here'
                  onChange={event => this.handleChange("Street", event)}
                  disabled={this.state.showInfo.venueId === "" ? false : true}
                />
              </div>
              <div className='form-group'>
                <small className='form-text text-muted'>Street and #</small>
                <input
                  type='text'
                  className='form-control'
                  placeholder='123 Fake St'
                  onChange={event => this.handleChange("Street", event)}
                  disabled={this.state.showInfo.venueId === "" ? false : true}
                />
              </div>
              <div className='form-group'>
                <small className='form-text text-muted'>City</small>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Fakesville'
                  onChange={event => this.handleChange("City", event)}
                  disabled={this.state.showInfo.venueId === "" ? false : true}
                />
              </div>
              <div className='form-group'>
                <small className='form-text text-muted'>State</small>
                <input
                  type='text'
                  className='form-control'
                  placeholder='MN'
                  onChange={event => this.handleChange("State", event)}
                  disabled={this.state.showInfo.venueId === "" ? false : true}
                />
              </div>
              <div className='form-group'>
                <small className='form-text text-muted'>Zip Code</small>
                <input
                  type='text'
                  className='form-control'
                  placeholder='55555'
                  onChange={event => this.handleChange("zip", event)}
                  disabled={this.state.showInfo.venueId === "" ? false : true}
                />
              </div>
              <Button type='submit' variant='contained' color='primary'>
                Submit New Venue
              </Button>
            </form>
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
              Previously selected band was:{" "}
              {this.props.store.eventDetailsReducer.band_name}
              <br />
              <br />
              If band isn't in dropdown, navigate to "View Bands" page to add
              band to list
            </small>
          </div>

          <Button type='submit' variant='contained' color='primary'>
            Submit Edits
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(EditShowPage);
