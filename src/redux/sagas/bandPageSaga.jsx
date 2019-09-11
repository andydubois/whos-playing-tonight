import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getBandDetails(action) {
  console.log("client side event details GET", action);
  try {
    let response = yield axios.get(`/api/band/${action.payload}`);
    console.log("GET event details response", response.data);
    //gives event info to eventDetails reducer
    yield put({
      type: "SET_BAND_DETAILS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in event details GET client side", error);
  }
}

function* watchMe() {
    yield takeEvery ("FETCH_BAND_DETAILS", getBandDetails)
}

export default watchMe;