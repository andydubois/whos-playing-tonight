import axios from "axios";
import {put, takeEvery } from "redux-saga/effects";

function* getEventDetails(action) {
  console.log("client side event details GET", action);
  try {
    let response = yield axios.get(`/api/eventDetails/${action.payload}`);
    console.log("GET event details response", response.data);
    //gives event info to eventDetails reducer
    yield put({
      type: "SET_EVENT_DETAILS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in event details GET client side", error);
  }
}

function* getEventGuests(action) {
    console.log("client side event guests GET", action);
    try {
        let response = yield axios.get(`/api/eventDetails/guests/${action.payload}`);
        console.log("GET guests for event response", response.data);
        //gives list of guests to eventGuest reducer
        yield put ({
            type: "SET_GUESTS",
            payload: response.data
        });
    } catch (error) {
        console.log("error in event guest GET client side", error);
    }
}

function* rsvpForEvent(action) {
    console.log("client side event rsvp POST", action);
    let userId=action.payload.userId
    try {
        let response = yield axios.post(`/api/eventDetails/rsvp/${userId}`, action.payload);
        console.log("POST rsvp for event response", response.data, action.payload);
        yield put ({
            type: "FETCH_GUESTS",
            payload: action.payload.eventId
        });
    } catch (error) {
        console.log("error in event rsvp POST client side", error);
    }
}

function* notGoingToEvent(action) {
    console.log("client side DELETE of rsvp/ not going to event", action);
    let eventId=action.payload.eventId
    try {
        yield axios.delete(`/api/eventDetails/noRsvp/${eventId}`, action.payload);
        console.log('rsvp DELETE route', action.payload);
        yield put ({
            type: "FETCH_GUESTS",
            payload: action.payload.eventId
        })
    } catch (error) {
        console.log('error in client side rsvp delete', error)
    }
}



function* watchMe() {
  yield takeEvery("FETCH_EVENT_DETAILS", getEventDetails);
  yield takeEvery("FETCH_GUESTS", getEventGuests);
  yield takeEvery("RSVP_EVENT", rsvpForEvent);
  yield takeEvery("NOT_GOING_TO_EVENT", notGoingToEvent)
}

export default watchMe;
