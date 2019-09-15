import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CssBaseline } from "@material-ui/core";


//Components
import HomeEventList from "../HomeEventList/HomeEventList";


const styles = theme => ({
	table: {
    size: "small",
    maxWidth: '75%'
	},
	root: {
    width: '75%'
	},
	//etc
});



class Home extends Component {
  componentDidMount() {
    //refreshes movie data every time page is loaded
    this.getShows();
  }

  getShows() {
    this.props.dispatch({
      type: "FETCH_HOME_INFO"
    });
  }

  render() {

    const {classes} = this.props

    return (
      <div className='react-transition swipe-right'>
        <CssBaseline />
        <h1>Welcome!</h1>
        <h5>{this.props.store.homeReducer.length} shows to see!</h5>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Band</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.store.homeReducer.map(show => {
              return <HomeEventList show={show} />;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(Home));
