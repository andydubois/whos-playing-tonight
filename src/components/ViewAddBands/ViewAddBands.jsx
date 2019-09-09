import React, {Component} from "react";
import {connect} from "react-redux";

class ViewAddBands extends Component {
    render() {
        return (
            <p>This is the View/add Bands Page!</p>
        )
    }
}

export default connect()(ViewAddBands);