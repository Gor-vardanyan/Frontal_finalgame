import { createStore } from 'redux';
import personaje_1 from './Reducer.js';

const store = createStore(
    personaje_1,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;