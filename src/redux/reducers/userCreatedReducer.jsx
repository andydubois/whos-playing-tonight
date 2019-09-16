// Used to store evnets created by specific user returned from the server
const userCreated = (state = [], action) => {
  switch (action.type) {
    case "SET_CREATED_SHOWS":
      return action.payload;
    default:
      return state;
  }
};

export default userCreated;
