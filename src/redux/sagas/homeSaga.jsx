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

function* getUserUpcoming(action) {
  console.log('client side upcoming user shows GET', action);
  try {
    let response = yield axios.get(`/api/home/upcoming/${action.payload}`);
    console.log("upcoming show saga response", response.data);
    yield put ({
      type: "SET_USER_UPCOMING",
      payload: response.data
    })
  } catch (error) {
    console.log("error in home page upcoming shows GET client side", error);
  }
}

function* getWeekUpcoming(action) {
  console.log("client side upcoming user shows GET", action);
  try {
    let response = yield axios.get(`/api/home/upcoming/week/${action.payload}`);
    console.log("upcoming show saga response", response.data);
    yield put({
      type: "SET_USER_WEEK_UPCOMING",
      payload: response.data
    });
  } catch (error) {
    console.log("error in home page upcoming shows for the week GET client side", error);
  }
}

function* watchMe() {
  yield takeEvery("FETCH_HOME_INFO", getHomeInfo);
  yield takeEvery("FETCH_USER_UPCOMING", getUserUpcoming);
  yield takeEvery("FETCH_USER_WEEK_UPCOMING", getWeekUpcoming)
}

export default watchMe;
