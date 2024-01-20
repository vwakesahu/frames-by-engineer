export const actionType = {
  SET_USER: "SET_USER",
  SET_FRAMES: "SET_FRAMES",
};

const reducer = (state, action) => {
  //console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FRAMES:
      return {
        ...state,
        frames: action.frames,
      };

    default:
      return state;
  }
};

export default reducer;
