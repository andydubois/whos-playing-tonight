import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

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
    return (
      <div>
        <h1>WHO'S PLAYING TONIGHT?</h1>
        <h4>10 shows this month (static)</h4>
        <h4>5 shows this week (static)</h4>
        <h5>{this.props.store.homeReducer.length} show today</h5>
        <ul>
          {this.props.store.homeReducer.map(show => {
            return (
              <li key={show.id}>
                {show.band_name}
                <br />
                <Moment format='MM/DD/YYYY'>{show.date}</Moment>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(Home);
