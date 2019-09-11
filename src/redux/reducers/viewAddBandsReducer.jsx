// Used to store list of all bands in database
const viewAddBandsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BANDS":
      return action.payload;
    default:
      return state;
  }
};

export default viewAddBandsReducer;
