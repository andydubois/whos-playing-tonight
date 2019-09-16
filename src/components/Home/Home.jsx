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
import { Container, Col, Row } from "react-bootstrap";

const styles = theme => ({
  table: {
    size: "small",
  },
  root: {
  }
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
    const { classes } = this.props;

    return (
      <Container className='react-transition swipe-right'>
        <Row>
          <Col></Col>
          <Col xs={10} className="homeContainer">
            <CssBaseline />
            <h1>Who's Playing Tonight?</h1>
            <h5 className='homeHeader'>
              {this.props.store.homeReducer.length} shows to see!
            </h5>
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
