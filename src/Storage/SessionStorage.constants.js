
export let SessionStorageKeys = {
    SIGNED_USER: 'SIGNED_USER',
    TODO_ITEMS: 'TODO_ITEMS'
}

export function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(SessionStorageKeys.SIGNED_USER));
}

export function saveCurrentUser(user) {
    sessionStorage.setItem(SessionStorageKeys.SIGNED_USER, JSON.stringify(user));
}

export function getTodoItems() {
    return JSON.parse(sessionStorage.getItem(SessionStorageKeys.TODO_ITEMS));
}

export function saveTodoItems(items) {
    sessionStorage.setItem(SessionStorageKeys.TODO_ITEMS, JSON.stringify(items));
}

export function clearSession() {
    sessionStorage.clear()
}