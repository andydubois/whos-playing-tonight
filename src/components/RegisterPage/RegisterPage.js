import React, { Component } from 'react';
import {connect} from 'react-redux';

//Material UI Components
import { CssBaseline } from "@material-ui/core";
import Button from "@material-ui/core/Button";

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <CssBaseline />
        {this.props.errors.registrationMessage && (
          <h2 className='alert' role='alert'>
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className='loginForm' onSubmit={this.registerUser}>
          <h1>Register</h1>
          <h1>User</h1>
          <div>
            <label htmlFor='username'>
              Username:
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChangeFor("username")}
              />
            </label>
          </div>
          <div>
            <label htmlFor='password'>
              Password:
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </label>
          </div>
          <div>
            <input
              className='register'
              type='submit'
              name='submit'
              value='Register'
            />
          </div>
        </form>
        <center>
          <Button
            type='button'
            className='link-button'
            variant='contained'
            color='secondary'
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}>
            Login
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

