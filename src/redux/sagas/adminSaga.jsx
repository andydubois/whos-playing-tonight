import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* addShow(action) {
  console.log("client side band DELETE", action);
  try {
    let response = yield axios.pos(`/api/addShow`, action.payload);
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
}

export default watchMe;
