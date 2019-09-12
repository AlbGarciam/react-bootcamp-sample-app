const userReducer = (currentState, action) => {
  switch(action.type) {
    case "CLEAR":
      currentState = {};
      break;
    case "SAVE_USER":
      currentState.user = action.payload;
      break;
    case "SAVE_TODOS":
      currentState.todos = action.payload;
      break;
  }
  return currentState;
};

export default userReducer;