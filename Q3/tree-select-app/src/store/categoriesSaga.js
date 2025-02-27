/**********************************************
 * categoriesSaga.js
 *
 * Defines the saga to handle fetching categories via an API call.
 **********************************************/

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from "./categoriesSlice";

// Worker saga: performs the actual fetch
function* fetchCategoriesWorker() {
  try {
    const response = yield call(axios.get, "http://localhost:8080/categories");
    // On success, dispatch the success action
    yield put(fetchCategoriesSuccess(response.data));
  } catch (e) {
    // On error, dispatch the failure action
    yield put(fetchCategoriesFailure(e.message));
  }
}

// Watcher saga: watch for the fetchCategoriesRequest action
export default function* categoriesSaga() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesWorker);
}
