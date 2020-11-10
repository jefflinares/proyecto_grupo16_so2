const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_MENU":
      return {
        ...state,
        menu: [action.payload]
      }
    default:
      return state;
  }
};

export default reducer;
