const venueReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_VENUES":
      return action.payload;
    default:
      return state;
  }
};

export default venueReducer;
