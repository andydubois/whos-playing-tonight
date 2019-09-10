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
            type: "SET_GUESTS"
        })
    }
}



function* watchMe() {
  yield takeEvery("FETCH_EVENT_DETAILS", getEventDetails);
}

export default watchMe;
