// Used to store event guests for specific show returned from the server
const eventGuestReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_GUESTS":
      return action.payload;
    default:
      return state;
  }
};

export default eventGuestReducer;
