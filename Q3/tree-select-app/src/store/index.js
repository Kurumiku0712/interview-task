/**********************************************
 * index.js
 *
 * Creates and configures the Redux store with Redux Toolkit and sagaMiddleware.
 **********************************************/

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import categoriesReducer from "./categoriesSlice";
import rootSaga from "./rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  // Add sagaMiddleware to the RTK middleware chain
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);
