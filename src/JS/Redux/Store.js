import {createStore} from 'redux';
import {initialStoreState, reducer} from './Reducers';
import { setLocalStorage } from './LocalStorage';

const store = createStore(reducer, initialStoreState);

store.subscribe(
    () => setLocalStorage(store.getState())
);

export default store;