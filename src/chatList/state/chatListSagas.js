import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { store } from "../../store";
import {
  ADD_CHAT_WITH_FIREBASE,
  chatListSelectChat,
  chatListSetList,
  CHAT_LIST_INIT_TRACKING_WITH_FIREBASE,
  REMOVE_CHAT_WITH_FIREBASE,
} from "./chatListActions";
import { selectChatList } from "../../store/chatListReducer/selectors";

const handleChangedChatList = (snapshot) => {
  const newChatList = [];
  snapshot.forEach((entry) => {
    newChatList.push({ id: entry.key, ...entry.val() });
  });
  store.dispatch(chatListSetList(newChatList));
};

function onChatListInitTrackingWithFirebase(action) {
  const chatListRef = firebase.database().ref("chatList");
  chatListRef.off("value", handleChangedChatList);
  chatListRef.on("value", handleChangedChatList);
}

function* watchChatListInitTrackingWithFirebase() {
  yield takeEvery(
    CHAT_LIST_INIT_TRACKING_WITH_FIREBASE,
    onChatListInitTrackingWithFirebase
  );
}

function onAddChatWithFirebase(action) {
  firebase
    .database()
    .ref("chatList")
    .push({ name: String(action.payload.name) });
}

function* onRemoveChatWithFirebase(action) {
  const chatId = action.payload.id;
  if (chatId) {
    const chatList = yield select(selectChatList);
    const chatToSelectAfter = chatList.find(
      (chat) => String(chat.id) !== String(chatId)
    );
    firebase.database().ref("chatList").child(chatId).remove();
    if (chatToSelectAfter) {
      yield put(chatListSelectChat(chatToSelectAfter.id));
    } else {
      yield put(chatListSelectChat(""));
    }
  }
}

function* watchAddChatWithFirebase() {
  yield takeEvery(ADD_CHAT_WITH_FIREBASE, onAddChatWithFirebase);
}

function* watchRemoveChatWithFirebase() {
  yield takeEvery(REMOVE_CHAT_WITH_FIREBASE, onRemoveChatWithFirebase);
}

function* watchChatListActions() {
  yield all([
    fork(watchChatListInitTrackingWithFirebase),
    fork(watchAddChatWithFirebase),
    fork(watchRemoveChatWithFirebase),
  ]);
}

export { watchChatListActions };
