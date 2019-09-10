import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI Components
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class ViewAddBands extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>View/Add Bands</h1>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Paper>xs=12</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>xs=12</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(ViewAddBands));
