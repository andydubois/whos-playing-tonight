// Used to store event details for specific show returned from the server
const bandShows = (state = [], action) => {
  switch (action.type) {
    case "SET_PAST_SHOWS":
      return action.payload;
    default:
      return state;
  }
};

export default bandShows;
