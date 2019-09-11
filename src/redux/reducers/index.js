import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import homeReducer from './homeReducer'
import eventDetailsReducer from './eventDetailsReducer'
import eventGuestReducer from './eventGuestReducer'
import viewAddBandsReducer from './viewAddBandsReducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  homeReducer, //will have full list of shows entered into database
  eventDetailsReducer, //will have all details for specified show
  eventGuestReducer, //will have all guests for specified show
  viewAddBandsReducer //will have all bands in database
});

export default rootReducer;
