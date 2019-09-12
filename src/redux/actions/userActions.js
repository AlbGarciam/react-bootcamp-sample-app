export const clear = () => ({
  type: "CLEAR"
});

export const saveUser = user => ({
  type: "SAVE_USER",
  payload: user
});

export const saveTodos = todos => ({
  type: "SAVE_TODOS",
  payload: todos
});