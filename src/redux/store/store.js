import {createStore} from 'redux'
import userReducer from '../reducers/userReducer'

const initialState = {
};

const store = createStore(userReducer, initialState);

export default store;