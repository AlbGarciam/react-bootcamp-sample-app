import store from '../redux/store/store';
import {saveUser, clear, saveTodos} from '../redux/actions/userActions';

export let SessionStorageKeys = {
    SIGNED_USER: 'SIGNED_USER',
    TODO_ITEMS: 'TODO_ITEMS'
}

export function getCurrentUser() {
  return store.getState().user;
  //  return JSON.parse(sessionStorage.getItem(SessionStorageKeys.SIGNED_USER));
}

export function saveCurrentUser(user) {
  store.dispatch(saveUser(user));
  //  sessionStorage.setItem(SessionStorageKeys.SIGNED_USER, JSON.stringify(user));
}

export function getTodoItems() {
  return store.getState().todos || [];
  //  return JSON.parse(sessionStorage.getItem(SessionStorageKeys.TODO_ITEMS));
}

export function saveTodoItems(items) {
  store.dispatch(saveTodos(items));
  //  sessionStorage.setItem(SessionStorageKeys.TODO_ITEMS, JSON.stringify(items));
}

export function clearSession() {
  store.dispatch(clear);
  //  sessionStorage.clear()
}

