import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import myFirstReducer from "./reducer";
import mySaga from "./sagas";

// Create the saga middleware 
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  myFirstReducer,
});
// Mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// Run the saga
sagaMiddleware.run(mySaga);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
