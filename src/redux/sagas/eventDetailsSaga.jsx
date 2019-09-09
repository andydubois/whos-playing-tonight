import axios from "axios";
import {put, takeEvery } from "redux-saga/effects";

function* getEventDetails(action) {
  console.log("client side event details GET", action);
  try {
    let response = yield axios.get(`/api/eventDetails/${action.payload}`);
    console.log("genre GET event details response", response.data);
    //gives genre info to genre reducer
    yield put({
      type: "SET_EVENT_DETAILS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in event details GET client side", error);
  }
}

function* watchMe() {
  yield takeEvery("FETCH_EVENT_DETAILS", getEventDetails);
}

export default watchMe;
