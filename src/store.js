import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import profileReducer from "./profile/state/profileReducer";
import chatListReducer from "./chatList/state/chatListReducer";
import chatReducer from "./chat/state/chatReducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  profile: profileReducer,
  chatList: chatListReducer,
  chat: chatReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
