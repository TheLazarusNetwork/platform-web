import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from './rootReducer'

const composeEnhancers = composeWithDevTools({
    realtime: true,
    hostname: 'localhost',
    port: 8000 });
const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunk)))
export default store;