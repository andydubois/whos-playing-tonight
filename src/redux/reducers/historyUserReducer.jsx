// Used to store event details for specific show returned from the server
const userHistory = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_HISTORY":
      return action.payload;
    default:
      return state;
  }
};

export default userHistory;
