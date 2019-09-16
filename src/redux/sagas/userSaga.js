import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* fetchHistory(action) {
  try {
    let response = yield axios.get(`/api/user/history/${action.payload}`);
    console.log("GET all past shows for user id:", response.data);
    //gives history to profile page
    yield put({
      type: "SET_USER_HISTORY",
      payload: response.data
    });
  } catch (error) {
    console.log("error in user history GET client side", error);
  }
}

function* fetchCreatedByUser(action) {
  try {
    let response = yield axios.get(`/api/user/created/${action.payload}`);
    console.log("GET all shows created by user id:", response.data);
    yield put({
      type: "SET_CREATED_SHOWS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in the created by user GET client side", error);
  }
}

function* deleteShow(action) {
  try {
    yield axios.delete(`/api/user/deleteShow/${action.payload.id}`);
    console.log(`delete show saga response`, action.payload);
    yield put ({
      type: "FETCH_CREATED",
      payload: action.payload.creator_id
    })
  } catch (error) {
    console.log("error in the deleteShow DELETE client side", error)
  }
}

function* userSaga() {
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeEvery("FETCH_HISTORY", fetchHistory);
  yield takeEvery("FETCH_CREATED", fetchCreatedByUser);
  yield takeEvery("DELETE_USER_SHOW", deleteShow);
}

export default userSaga;
