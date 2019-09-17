const bandName = (state = [], action) => {
  switch (action.type) {
    case "SET_BAND_DETAILS":
      return action.payload[0];
    default:
      return state;
  }
};

export default bandName;
