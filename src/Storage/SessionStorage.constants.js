import store from '../redux/store/store';
import {saveUser, clear, saveTodos} from '../redux/actions/userActions';
import Todo from '../Views/Scenes/Todos/Todo.model';

export function getCurrentUser() {
  return store.getState().user;
}

export function saveCurrentUser(user) {
  store.dispatch(saveUser(user));
}

export function getTodoItems() {
  return store.getState().todos || [];
}

export function clearSession() {
  store.dispatch(clear);
}

export function insertTodo(data) {
  var items = getTodoItems()
  if (items.filter(item => item.value === data).length > 0) { return; }
  items.push(new Todo(new Date(), data));
  saveTodoItems(items);
}

export function editTodoAtPosition(position, data) {
  var newTodoList = getTodoItems();
  newTodoList[position].value = data;
  saveTodoItems(newTodoList)
}

export function deleteTodo(item) {
  var newTodoItems = getTodoItems() || [];
  let position = newTodoItems.indexOf(item);
  if (position === null) { return ; }
  newTodoItems.splice(position, 1);
  saveTodoItems(newTodoItems);
}

// MARK: - Private methods

function saveTodoItems(items) {
  store.dispatch(saveTodos(items));
}


