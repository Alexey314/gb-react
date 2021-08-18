import { all, fork } from "redux-saga/effects";
import { watchChatActions } from "./chat/state/chatSagas";
import { watchChatListActions } from "./chatList/state/chatListSagas";
import { watchProfileActions } from "./profile/state/profileSagas";
import { watchStartRequest } from "./weather/state/weatherSagas";

export default function* rootSaga() {
  yield all([
    fork(watchChatActions),
    fork(watchStartRequest),
    fork(watchProfileActions),
    fork(watchChatListActions),
  ]);
}
