const newBandReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BAND":
      return action.payload;
    default:
      return state;
  }
};

export default newBandReducer;
