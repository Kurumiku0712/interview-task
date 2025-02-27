import { FETCH_USERS, FETCH_USERS_SUCCESS } from "./actions";

/**
 * The most basic reducer.
 *
 * @param {Object} state The current state.
 * @param {Object} action The action to handle.
 * @return {Object} The new state.
 */
const myFirstReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default myFirstReducer;
