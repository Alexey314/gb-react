import { all, fork } from "redux-saga/effects";
import { watchSentMessages } from "./chat/state/chatSagas";
import { watchProfileActions } from "./profile/state/profileSagas";
import { watchStartRequest } from "./weather/state/weatherSagas";

export default function* rootSaga() {
  yield all([fork(watchSentMessages), fork(watchStartRequest),
    fork(watchProfileActions)]);
}
