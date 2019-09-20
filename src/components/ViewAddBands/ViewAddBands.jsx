import React, { Component } from "react";
import { connect } from "react-redux";
import ViewAddList from "../ViewAddList/ViewAddList";
import "./ViewAddBands.css";

//Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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

class ViewAddBands extends Component {
  state = {
    band: "",
    snackBarOpen: false
  };

  componentDidMount() {
    this.getBandList();
  }

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

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
    this.setState({ snackBarVenueOpen: true });
    //clears band info from state after being added to database
    this.clearState();
  };

  clearState() {
    this.setState({
      band: ""
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>View/Add </h1>
        <h1>Bands</h1>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h4>List of</h4>
              <h4 className='bandsHeader'>Bands</h4>
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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id='message-id'>New Band Added to List!</span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleSnackClose}>
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

export default withStyles(styles)(connect(mapStateToProps)(ViewAddBands));
