import React, { Component } from "react";
import { connect } from "react-redux";
import ViewAddList from "../ViewAddList/ViewAddList";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

class ViewAddBands extends Component {
  state = {
    band: ""
  };

  componentDidMount() {
    this.getBandList();
  }

  getBandList() {
    this.props.dispatch({
      type: "FETCH_BANDS"
    });
  }

  handleChange = (propertyName, event) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    //takes current local state and sends to reducer
    this.props.dispatch({
      type: "ADD_BAND",
      payload: this.state
    });
    this.clearState();
  };

  clearState() {
    this.setState({
      band: ""
    });
  }

  render() {
    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>View/Add Bands</h1>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h4>List of Bands</h4>
              <p></p>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      (Click band for further details on each)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.viewAddBandsReducer.map(band => {
                    return <ViewAddList band={band} />;
                  })}
                </TableBody>
              </Table>
            </div>
            <div className='col-6'>
              <h4>Add Band</h4>
              {/* <TextField label="New Band Here" fullWidth/>
              <TextField label="YT link to music here"/> */}
              <form className='newBandForm' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label>Band</label>
                  <input
                    value={this.state.band}
                    type='text'
                    className='form-control'
                    placeholder='Band'
                    onChange={event => this.handleChange("band", event)}
                  />
                  <small className='form-text text-muted'>
                    -Enter band name above. <br />
                    -Click on band names to travel to band pages and add music
                    links for each.
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(ViewAddBands);
