/**********************************************
 * rootSaga.js
 *
 * Combines all watcher sagas using redux-saga/effects 'all'.
 **********************************************/

import { all } from "redux-saga/effects";
import categoriesSaga from "./categoriesSaga";

export default function* rootSaga() {
  yield all([
    categoriesSaga(),
    // Add other watcher sagas here if needed
  ]);
}
