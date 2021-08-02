import { combineReducers, createStore } from "redux";
import profileReducer from "./profile/state/profileReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
