import React, { Component } from "react";
import { connect } from "react-redux";
import ShowList from "../ShowList/ShowList";

//Material UI Components
import Button from "@material-ui/core/Button";

class BandPage extends Component {
  render() {
    return (
      <div>
        <h1>Band Page</h1>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h4>Past Shows</h4>
              <ul>
                {this.props.store.pastShowReducer.map(show => {
                  return <ShowList show={show} />;
                })}
              </ul>
              <h4>Future Shows</h4>
              <ul>
                {this.props.store.futureShowReducer.map(show => {
                  return <ShowList show={show} />;
                })}
              </ul>
            </div>
            <div class='col-6'>
              <h4>Add YouTube music link</h4>
              <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
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
                </div>
                <Button type='submit' variant='contained' color='primary'>
                  Add New Music
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(BandPage);
