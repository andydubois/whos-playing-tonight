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
import Button from "@material-ui/core/Button";

//Components
import HomeEventList from "../HomeEventList/HomeEventList";
import { Container, Col, Row } from "react-bootstrap";

const styles = theme => ({
  table: {
    size: "small"
  },
  root: {}
  //etc
});

class Home extends Component {
  state = {
    myShowsAll: false,
    myShowsWeek: true
  };

  componentDidMount() {
    //refreshes movie data every time page is loaded
    this.getShows();
    this.getUpcomingShows();
    this.getWeekShows();
  }

  getShows() {
    this.props.dispatch({
      type: "FETCH_HOME_INFO"
    });
  }

  getUpcomingShows() {
    this.props.dispatch({
      type: "FETCH_USER_UPCOMING",
      payload: this.props.store.user.id
    });
  }

  getWeekShows() {
    this.props.dispatch({
      type: "FETCH_USER_WEEK_UPCOMING",
      payload: this.props.store.user.id
    });
  }

  showAllMyShows = () => {
    this.setState({
      myShowsAll: true,
      myShowsWeek: false
    });
  };
  showMyShowsWeek = () => {
    this.setState({
      myShowsAll: false,
      myShowsWeek: true
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Container className='react-transition swipe-right'>
        <Row>
          {/* <Col></Col> */}
          <Col xs={12} className='homeContainer'>
            <CssBaseline />
            <h2>Who's Playing</h2>
            <h2>Tonight?</h2>
            <br />
            <Button
              onClick={this.showMyShowsWeek}
              variant='contained'
              color='primary'>
              My Shows this week
            </Button>
            <Button
              onClick={this.showAllMyShows}
              variant='contained'
              color='primary'>
              My Shows (All)
            </Button>
            <div className={this.state.myShowsAll ? null : "hidden"}>
              <h6>My Shows (All)</h6>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Band</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.userUpcomingReducer.map(show => {
                    return <HomeEventList show={show} />;
                  })}
                </TableBody>
              </Table>
            </div>
            <div className={this.state.myShowsWeek ? null : "hidden"}>
              <h6>My Shows This Week</h6>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Band</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.userUpcWeekReducer.map(show => {
                    return <HomeEventList show={show} />;
                  })}
                </TableBody>
              </Table>
            </div>
            <h6>List of All Shows</h6>
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
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(Home));
