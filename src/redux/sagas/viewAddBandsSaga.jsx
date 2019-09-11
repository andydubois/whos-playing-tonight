import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getAllBands(action) {
  console.log("client side bands GET", action);
  try {
    let response = yield axios.get("/api/viewAdd");
    console.log("saga response", response.data);
    yield put({
      type: "SET_BANDS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in view/add bands GET client side", error);
  }
}

function* watchMe() {
  yield takeEvery("FETCH_BANDS", getAllBands);
}

export default watchMe;
