import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import showSaga from './homeSaga'
import eventDetailsSaga from './eventDetailsSaga'
import viewAddBandsSaga from './viewAddBandsSaga'
import bandPageSaga from './bandPageSaga'
import addEventSaga from './addEventSaga'
import allShowsSaga from './allShowsSaga'
import editEventSaga from './editEventSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    showSaga(),
    eventDetailsSaga(),
    viewAddBandsSaga(),
    bandPageSaga(),
    addEventSaga(),
    allShowsSaga(),
    editEventSaga()
  ]);
}
