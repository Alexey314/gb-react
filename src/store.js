import { combineReducers, createStore } from "redux";
import profileReducer from "./profile/state/profileReducer";
import chatListReducer from "./chatList/state/chatListReducer";
import chatReducer from "./chat/state/chatReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  chatList: chatListReducer,
  chat: chatReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
