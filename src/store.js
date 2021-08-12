import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import profileReducer from "./profile/state/profileReducer";
import chatListReducer from "./chatList/state/chatListReducer";
import chatReducer from "./chat/state/chatReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import { watchSentMessages } from "./chat/state/chatSagas";

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

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchSentMessages)

export const persistor = persistStore(store);
