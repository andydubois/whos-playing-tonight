import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getBandDetails(action) {
  console.log("client side band details GET", action);
  try {
    let response = yield axios.get(`/api/band/${action.payload}`);
    console.log("GET event details response", response.data);
    //gives band info to bandDetails reducer
    yield put({
      type: "SET_BAND_DETAILS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in band details GET client side", error);
  }
}

function* getPastShows(action) {
    console.log("client side band shows GET", action);
    try {
        let response = yield axios.get(`/api/band/pastShows/${action.payload}`);
        console.log("GET all shows for band", response.data);
        //gives band shows to bandPageShow reducer
        yield put ({
            type: "SET_PAST_SHOWS",
            payload: response.data
        });
    } catch (error) {
        console.log("error on bandShows GET client side", error);
    }
}

function* watchMe() {
    yield takeEvery ("FETCH_BAND_DETAILS", getBandDetails);
    yield takeEvery ("FETCH_BAND_SHOWS", getPastShows);
}

export default watchMe;