import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USERS, FETCH_USERS_SUCCESS } from "./actions";

function fetchUsersApi() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
}

function* fetchUsers() {
  const users = yield call(fetchUsersApi);
  yield put({ type: FETCH_USERS_SUCCESS, users: users });
}

function* mySaga() {
  yield takeEvery(FETCH_USERS, fetchUsers);
}

export default mySaga;
