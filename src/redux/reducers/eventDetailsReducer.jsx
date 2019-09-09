// Used to store event details for specific show returned from the server
const eventDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default eventDetailsReducer;
