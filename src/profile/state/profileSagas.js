import { all, fork, takeEvery } from "redux-saga/effects";
import {
  PROFILE_CHANGE_IS_ONLINE_WITH_FIREBASE,
  PROFILE_CHANGE_NAME_WITH_FIREBASE,
  PROFILE_INIT_TRACKING_WITH_FIREBASE,
} from "./profileActions";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { profileChangeIsOnline, profileChangeName } from "./profileActions";
import { store } from "../../store";

function onInitProfileTrackingWithFirebase() {
  const user = firebase.auth().currentUser;
  firebase
    .database()
    .ref("profile")
    .child(user.uid)
    .child("name")
    .on("value", (snapshot) => {
      store.dispatch(profileChangeName(String(snapshot.val() || "")));
    });
  firebase
    .database()
    .ref("profile")
    .child(user.uid)
    .child("isOnline")
    .on("value", (snapshot) => {
      store.dispatch(profileChangeIsOnline(!!snapshot.val()));
    });
}

function onChangeIsOnlineWithFirebase(action) {
  const user = firebase.auth().currentUser;
  firebase
    .database()
    .ref("profile")
    .child(user.uid)
    .child("isOnline")
    .set(action.payload.isOnline);
}

function onChangeNameWithFirebase(action) {
  const user = firebase.auth().currentUser;
  firebase
    .database()
    .ref("profile")
    .child(user.uid)
    .child("name")
    .set(action.payload.name);
}

function* watchInitProfileTrackingWithFirebase() {
  yield takeEvery(
    PROFILE_INIT_TRACKING_WITH_FIREBASE,
    onInitProfileTrackingWithFirebase
  );
}

function* watchIsOnlineChangeWithFirebase() {
  yield takeEvery(
    PROFILE_CHANGE_IS_ONLINE_WITH_FIREBASE,
    onChangeIsOnlineWithFirebase
  );
}

function* watchChangeNameWithFirebase() {
  yield takeEvery(PROFILE_CHANGE_NAME_WITH_FIREBASE, onChangeNameWithFirebase);
}

function* watchProfileActions() {
  yield all([
    fork(watchInitProfileTrackingWithFirebase),
    fork(watchIsOnlineChangeWithFirebase),
    fork(watchChangeNameWithFirebase),
  ]);
}

export { watchProfileActions };
