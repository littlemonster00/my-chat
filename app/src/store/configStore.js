import { createStore, combineReducers } from "redux";
import messagesReducer from "../reducers/messages";
export default () => {
  const store = createStore(
    combineReducers({ messages: messagesReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
