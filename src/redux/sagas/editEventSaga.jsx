import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addShow(action) {
  console.log("client side editShow POST", action);
  try {
    let response = yield axios.put(`/api/editShow/first/${action.payload.eventId}`, action.payload);
    console.log("editEvent saga response", response.data);
    yield put({
      type: "FETCH_SHOWS"
    });
  } catch (error) {
    console.log("error in editShow POST client side", error);
  }
}

function* addShow2(action) {
  console.log("client side editShow POST", action);
  try {
    let response = yield axios.put(
      `/api/editShow/second/${action.payload.eventId}`,
      action.payload
    );
    console.log("editEvent saga response", response.data);
    yield put({
      type: "FETCH_SHOWS"
    });
  } catch (error) {
    console.log("error in editShow POST client side", error);
  }
}


function* watchMe() {
  yield takeEvery("EDIT_SHOW", addShow);
  // yield takeEvery("EDIT_SHOW", addShow2);
}

export default watchMe;