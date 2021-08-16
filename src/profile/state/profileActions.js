export const PROFILE_CHANGE_IS_ONLINE = "PROFILE::CHANGE_IS_ONLINE";
export const PROFILE_CHANGE_IS_ONLINE_WITH_FIREBASE =
  "PROFILE::CHANGE_IS_ONLINE_WITH_FIREBASE";
export const PROFILE_CHANGE_NAME = "PROFILE::CHANGE_NAME";
export const PROFILE_CHANGE_NAME_WITH_FIREBASE =
  "PROFILE::CHANGE_NAME_WITH_FIREBASE";
export const PROFILE_INIT_TRACKING_WITH_FIREBASE = "PROFILE::INIT_TRACKING";

export const profileChangeIsOnline = (isOnline) => ({
  type: PROFILE_CHANGE_IS_ONLINE,
  payload: {
    isOnline,
  },
});

export const profileChangeIsOnlineWithFirebase = (isOnline) => ({
  ...profileChangeIsOnline(isOnline),
  type: PROFILE_CHANGE_IS_ONLINE_WITH_FIREBASE,
});

export const profileChangeName = (name) => ({
  type: PROFILE_CHANGE_NAME,
  payload: {
    name,
  },
});

export const profileChangeNameWithFirebase = (name) => ({
  ...profileChangeName(name),
  type: PROFILE_CHANGE_NAME_WITH_FIREBASE,
});

export const profileInitTrackingWithFirebase = (name) => ({
  type: PROFILE_INIT_TRACKING_WITH_FIREBASE,
});
