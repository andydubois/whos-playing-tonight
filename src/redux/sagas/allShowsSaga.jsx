import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getAllShows(action) {
  console.log("client side all shows GET", action);
  try {
    let response = yield axios.get(`/api/admin/allShows`);
    console.log("GET venues response", response.data);
    //gives band info to bandDetails reducer
    yield put({
      type: "SET_ALL_SHOWS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in all shows GET client side", error);
  }
}

function* watchMe() {
    yield takeEvery("FETCH_ALL_SHOWS", getAllShows)
}

export default watchMe;
