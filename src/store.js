import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import profileReducer from "./profile/state/profileReducer";
import chatListReducer from "./chatList/state/chatListReducer";
import chatReducer from "./chat/state/chatReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  profile: profileReducer,
  chatList: chatListReducer,
  chat: chatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
