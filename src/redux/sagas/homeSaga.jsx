import axios from "axios";
import {put, takeEvery } from "redux-saga/effects";

function* getHomeInfo(action) {
  console.log("client side shows GET", action);
  try {
    let response = yield axios.get("/api/home");
    console.log("saga response", response.data);
    yield put({
      type: "SET_HOME_INFO",
      payload: response.data
    });
  } catch (error) {
    console.log("error in home page GET client side", error);
  }
}

function* watchMe() {
  yield takeEvery("FETCH_HOME_INFO", getHomeInfo);
}

export default watchMe;
