/**
 * The most basic reducer.
 *
 * @param {Object} state The current state.
 * @param {Object} action The action to handle.
 * @return {Object} The new state.
 */
const myFirstReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default myFirstReducer;
