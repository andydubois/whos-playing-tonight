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


function* watchMe() {
  yield takeEvery("FETCH_VENUES", getVenues);
}


export default watchMe;