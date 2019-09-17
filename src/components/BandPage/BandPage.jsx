import React, { Component } from "react";
import { connect } from "react-redux";
import ShowList from "../ShowList/ShowList";

//Material UI Components
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

class BandPage extends Component {
  state = {
    ytLink: "",
    bandId: this.props.match.params.id
  };

componentDidMount = () => {
  this.getBandDetails();
}


  handleChange = (propertyName, event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
    console.log(this.state);
  };

  getBandDetails = () => {
    this.props.dispatch({
      type: "FETCH_BAND_DETAILS",
      payload: this.props.match.params.id
    });
    this.props.dispatch({
      type: "FETCH_PAST_SHOWS",
      payload: this.props.match.params.id
    });
    this.props.dispatch({
      type: "FETCH_FUTURE_SHOWS",
      payload: this.props.match.params.id
    });
  };

  //adds YouTube link to database
  addYtLink = () => {
    this.props.dispatch({
      type: "ADD_MUSIC",
      payload: this.state
    });
    this.setState = {
      ytLink: ""
    };
    this.getBandDetails();
  };

  render() {
    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>{this.props.store.bandNameReducer.band_name}</h1>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h5>Past</h5>
              <h5 className='bandsHeader'>Shows</h5>
              <ul>
                {this.props.store.pastShowReducer.map(show => {
                  return <ShowList show={show} />;
                })}
              </ul>
              <h5>Future</h5>
              <h5 className='bandsHeader'>Shows</h5>
              <ul>
                {this.props.store.futureShowReducer.map(show => {
                  return <ShowList show={show} />;
                })}
              </ul>
            </div>
            <div className='col-6'>
              <h5>Add</h5>
              <h5 className='bandsHeader'>YouTube</h5>
              <h5 className='bandsHeader'>Music Link</h5>
              <form className='addShowForm' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>YouTube Link</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Link'
                    value={this.state.ytLink}
                    onChange={event => this.handleChange("ytLink", event)}
                  />
                  <small className='form-text text-muted'>
                    Enter YouTube link above
                  </small>
                </div>
                <Button
                  onClick={this.addYtLink}
                  type='submit'
                  variant='contained'
                  color='primary'>
                  Add New Music
                </Button>
              </form>
            </div>
          </div>
        </div>
        <iframe
          id='ytplayer'
          type='text/html'
          width='375'
          height='210'
          src='https://www.youtube.com/embed/wvUQcnfwUUM'
          frameborder='0'></iframe>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(BandPage);
