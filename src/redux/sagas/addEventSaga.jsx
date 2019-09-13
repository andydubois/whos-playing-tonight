import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getVenues(action) {
  console.log("client side venues GET", action);
  try {
    let response = yield axios.get(`/api/addShow/venues`)
    console.log("GET venues response", response.data);
    //gives band info to bandDetails reducer
    yield put({
      type: "SET_VENUES",
      payload: response.data
    });
  } catch (error) {
    console.log("error in venue GET client side", error);
  }
}

function* addShow(action) {
  console.log("client side addShow POST", action);
  try {
    let response = yield axios.post(`/api/addShow`, action.payload);
    console.log('addEvent saga response', response.data);
    yield put ({
      type: "FETCH_SHOWS"
    });
  } catch (error) {
    console.log('error in addNewShow POST client side', error);
  }
}

function* addVenue(action) {
  console.log('client side addVenue POST', action);
  try {
    let response = yield axios.post(`/api/addShow/AddVenue`, action.payload);
    console.log('addVenue saga response', response.data);
    yield put ({
      type: "FETCH_VENUES"
    });
  } catch (error) {
    console.log('error in addVenue POST client side', error);
  }
}


function* watchMe() {
  yield takeEvery("FETCH_VENUES", getVenues);
  yield takeEvery("ADD_SHOW", addShow);
  yield takeEvery("ADD_VENUE", addVenue)
}


export default watchMe;