import { call, put, takeEvery } from "redux-saga/effects";
import { fetchCatsSuccess, fetchCatsFailure } from "./catState";

function* workFetchCats() {
  try {
    const cats = yield call(() => fetch("https://api.thecatapi.com/v1/breeds"));
    const formattedCats = yield cats.json();
    const formattedCatsShortened = formattedCats.slice(0, 10);
    yield put(fetchCatsSuccess(formattedCatsShortened));
  } catch (e) {
    yield put(fetchCatsFailure(e.message));
  }
}

function* catSaga() {
  yield takeEvery("cats/fetchCats", workFetchCats);
}

export default catSaga;
