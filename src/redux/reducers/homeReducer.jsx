// Used to store shows returned from the server
const homeReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_HOME_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default homeReducer;
