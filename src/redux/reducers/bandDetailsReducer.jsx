// Used to store event details for specific show returned from the server
const bandDetails = (state = [], action) => {
  switch (action.type) {
    case "SET_BAND_DETAILS":
      return action.payload;
    case "CLEAR_BAND_DETAILS":
      return [];
    default:
      return state;
  }
};



export default bandDetails;
