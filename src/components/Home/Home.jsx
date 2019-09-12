import React, { Component } from "react";
import { connect } from "react-redux";


//Components
import HomeEventList from "../HomeEventList/HomeEventList"

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
        <h5>{this.props.store.homeReducer.length} shows to see!</h5>
        <ul>
          {this.props.store.homeReducer.map(show => {
            return (
                <HomeEventList show={show} history={this.props.history}/>
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
