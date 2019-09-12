import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI components
import Button from "@material-ui/core/Button";




class AddShowsPage extends Component {
  getVenues() {
    this.props.dispatch({
      type: "FETCH_VENUES"
    })
  }

  render() {
    return (
      <div>
        <h1>Add New Show</h1>
        <form className='addShowForm'>
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
            <select>
              <option value='0'></option>
            </select>
            <small className='form-text text-muted'>
              -Enter band name above. <br />
              -Click on band names to travel to band pages and add music links
              for each.
            </small>
          </div>
          {/* <div className='form-group'>
                  <label>YouTube Link</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Link'
                    onChange={event => this.handleChange("ytLink", event)}
                  />
                  <small className='form-text text-muted'>
                    Enter YouTube link above
                  </small>
                </div> */}
          <Button type='submit' variant='contained' color='primary'>
            Submit New Band
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(AddShowsPage);
