import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import NavTop from "../NavTop/NavTop"
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
import Home from "../Home/Home";
import ViewAddBands from "../ViewAddBands/ViewAddBands";
import AddShowPage from "../AddShowPage/AddShowPage";
import AdminPage from "../AdminPage/AdminPage";
import EventPage from "../EventPage/EventPage";
import BandPage from "../BandPage/BandPage";
import EditShowPage from "../EditShowPage/EditShowPage";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "./bootstrap-1.css";
import "./App.css";
import "./react-transitions.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5e35b1"
    },
    secondary: {
      light: "#ffff72",
      main: "#ffeb3b"
    },
    background: {
      default: "#9575cd"
    },
    default: {
      default: "#d20101"
    }
  }
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    let location = this.props.location
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <NavTop />
            <Switch className='transition-container'>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from='/' to='/home' />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <Route exact path='/profile' component={UserPage} />
              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute exact path='/home' component={Home} />
              {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
              <ProtectedRoute exact path='/bands' component={ViewAddBands} />
              <ProtectedRoute exact path='/addShow' component={AddShowPage} />
              <ProtectedRoute exact path='/admin' component={AdminPage} />
              <ProtectedRoute exact path='/event/:id' component={EventPage} />
              <ProtectedRoute
                exact
                path='/editShow/:id'
                component={EditShowPage}
              />
              <ProtectedRoute exact path='/bands/:id' component={BandPage} />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
