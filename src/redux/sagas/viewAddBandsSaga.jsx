import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getAllBands(action) {
  console.log("client side bands GET", action);
  try {
    let response = yield axios.get("/api/viewAdd");
    console.log("getAllBands saga response", response.data);
    yield put({
      type: "SET_BANDS",
      payload: response.data
    });
  } catch (error) {
    console.log("error in view/add bands GET client side", error);
  }
}

function* addNewBand(action) {
  console.log("client side add band POST", action);
  try {
    let response = yield axios.post(`/api/viewAdd/addBand`, action.payload);
    console.log("addNewBand saga response", response.data);
    yield put({
      type: "FETCH_BANDS"
    });
  } catch (error) {
    console.log("error in addNewBand POST client side", error);
  }
}


function* watchMe() {
  yield takeEvery("FETCH_BANDS", getAllBands);
  yield takeEvery("ADD_BAND", addNewBand);
}

export default watchMe;

