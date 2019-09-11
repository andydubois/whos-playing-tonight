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
        console.log("GET all past shows for band", response.data);
        //gives band shows to bandPageShow reducer
        yield put ({
            type: "SET_PAST_SHOWS",
            payload: response.data
        });
    } catch (error) {
        console.log("error on pastShows GET client side", error);
    }
}

function* getFutureShows(action) {
  console.log("client side band shows GET", action);
  try {
    let response = yield axios.get(`/api/band/futureShows/${action.payload}`);
    console.log("GET all future shows for band", response.data);
    //gives band shows to bandPageShow reducer
    yield put({
      type: "SET_FUTURE_SHOWS",
      payload: response.data
    });
  } catch (error) {
    console.log("error on futureShows GET client side", error);
  }
}


function* watchMe() {
    yield takeEvery ("FETCH_BAND_DETAILS", getBandDetails);
    yield takeEvery ("FETCH_PAST_SHOWS", getPastShows);
    yield takeEvery ("FETCH_FUTURE_SHOWS", getFutureShows);
}

export default watchMe;