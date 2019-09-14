import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// function* addShow(action) {
//   console.log("client side band DELETE", action);
//   try {
//     let response = yield axios.pos(`/api/addShow`, action.payload);
//     console.log("editEvent saga response", response.data);
//     yield put({
//       type: "FETCH_SHOWS"
//     });
//   } catch (error) {
//     console.log("error in editShow POST client side", error);
//   }
// }

function* deleteBand(action) {
  console.log("client side band DELETE", action);
  try {
    let response = yield axios.delete(`/api/admin/bandDelete/${action.payload.id}`);
    console.log(`deleteBand saga response deleting:${action.payload.band_name}`);
    yield put ({
      type: "FETCH_BANDS"
    });
  } catch (error) {
    console.log("error in deleteBand DELETE client side", error);
  }
}

function* watchMe() {
  yield takeEvery("DELETE_BAND", deleteBand);
}

export default watchMe;
