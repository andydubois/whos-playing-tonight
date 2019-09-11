// Used to store event details for specific show returned from the server
const bandPageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BAND_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default bandPageReducer;
