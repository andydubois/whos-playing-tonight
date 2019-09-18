// Used to store event details for specific show returned from the server
const upcomingShows = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_UPCOMING":
      return action.payload;
    default:
      return state;
  }
};

export default upcomingShows;
