import { all, call, fork, takeEvery } from "redux-saga/effects";
import { chatSetMessages, CHAT_INIT_TRACKING_WITH_FIREBASE, SEND_MESSAGE_WITH_FIREBASE } from "./chatActions";
import { BOT_NAME, getBotAnswer } from "../../bot.js";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { store } from "../../store";

const handleChangedMessageList = (snapshot) => {
  const newMsgList = [];
  const chatId = snapshot.key;
  snapshot.forEach((entry) => {
    newMsgList.push({ id: entry.key, ...entry.val() });
  });
  store.dispatch(chatSetMessages(chatId,newMsgList));
};

function onChatInitTrackingWithFirebase(action) {
  const currentChatId = action.payload.chatId;
  if (currentChatId) {
    const currentChatRef = firebase
      .database()
      .ref("chat")
      .child(currentChatId);
    currentChatRef.off("value", handleChangedMessageList);
    currentChatRef.on("value", handleChangedMessageList);
  }
}

function* watchChatInitTrackingWithFirebase() {
  yield takeEvery(
    CHAT_INIT_TRACKING_WITH_FIREBASE,
    onChatInitTrackingWithFirebase
  );
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* processSentMessage(action) {
  if (action.payload.msg.author !== BOT_NAME) {
    yield call(delay, 1500);
    const botMsg = getBotAnswer(action.payload.msg);
    firebase.database().ref("chat").child(action.payload.chatId).push(botMsg);
  }
}

function* onChatSendMessageWithFirebase(action) {
  firebase.database().ref("chat").child(action.payload.chatId).push(action.payload.msg);
  yield call(processSentMessage, action);
}

function* watchChatSendMessageWithFirebase() {
  yield takeEvery(
    SEND_MESSAGE_WITH_FIREBASE,
    onChatSendMessageWithFirebase
  );
}

function* watchChatActions() {
  yield all([
    fork(watchChatInitTrackingWithFirebase),
    fork(watchChatSendMessageWithFirebase),
    // fork(watchChangeNameWithFirebase),
  ]);
}

export { watchChatActions };
