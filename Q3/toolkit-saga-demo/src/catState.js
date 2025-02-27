import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
  name: "cats",
  initialState: {
    cats: [],
    isLoading: false,
  },
  reducers: {
    fetchCats: (state) => {
      state.isLoading = true;
    },
    fetchCatsSuccess: (state, action) => {
      state.cats = action.payload;
      state.isLoading = false;
    },
    fetchCatsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { fetchCats, fetchCatsSuccess, fetchCatsFailure } = catSlice.actions;

export default catSlice.reducer;
