// Used to store all shows returned from the server
const allShows = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_SHOWS":
      return action.payload;
    default:
      return state;
  }
};

export default allShows;
