import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI components
import Button from "@material-ui/core/Button";

class AddShowsPage extends Component {
  state = {
    showDate: "",
    doorTime: "",
    showTime: "",
    venueId: ""
  };

  componentDidMount() {
    this.getVenues();
  }

  getVenues() {
    this.props.dispatch({
      type: "FETCH_VENUES"
    });
  }

  handleChange = (propertyName, event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>Add New Show</h1>
        <form className='addShowForm'>
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
            <label>Manual Address Entry</label>
            <input
              type='text'
              className='form-control'
              placeholder='Venue name here'
              onChange={event => this.handleChange("Street", event)}
              disabled={this.state.venueId === "" ? false : true}
            />
            <small className='form-text text-muted'>Give venue a name</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='123 Fake St'
              onChange={event => this.handleChange("Street", event)}
              disabled={this.state.venueId === "" ? false : true}
            />
            <small className='form-text text-muted'>Street and #</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Fakesville'
              onChange={event => this.handleChange("City", event)}
              disabled={this.state.venueId === "" ? false : true}
            />
            <small className='form-text text-muted'>City</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='MN'
              onChange={event => this.handleChange("State", event)}
              disabled={this.state.venueId === "" ? false : true}
            />
            <small className='form-text text-muted'>State</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='55555'
              onChange={event => this.handleChange("zip", event)}
              disabled={this.state.venueId === "" ? false : true}
            />
            <small className='form-text text-muted'>Zip Code</small>
          </div>
          <Button type='submit' variant='contained' color='primary'>
            Submit Event
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(AddShowsPage);
