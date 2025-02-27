/**********************************************
 * useFetchCategories.js
 *
 * This custom hook fetches categories from the API and updates Redux state.
 **********************************************/

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../store/categoriesSlice";

/**
 * A custom hook to fetch categories from the API and update the Redux state.
 *
 * The hook returns an object with a single function, `fetchDataViaHook`, which
 * will call the API and dispatch to Redux when invoked.
 *
 * @returns {Object} Object with a single function, `fetchDataViaHook`
 */

export function useFetchCategories() {
  const dispatch = useDispatch();

  // Define a function to call the API and dispatch to Redux
  const fetchDataViaHook = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      // dispatch success
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (e) {
      // dispatch failure
      dispatch(fetchCategoriesFailure(e.message));
    }
  }, [dispatch]);

  return { fetchDataViaHook };
}
