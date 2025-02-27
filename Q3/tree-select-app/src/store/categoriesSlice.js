/**********************************************
 * categoriesSlice.js
 *
 * Defines the slice of the Redux store for categories
 * including name, initialState, reducers and actions
 **********************************************/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesRequest(state) {
      // set loading = true, clear error
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload; // category tree object
    },
    fetchCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

// Export reducer
export default categoriesSlice.reducer;
