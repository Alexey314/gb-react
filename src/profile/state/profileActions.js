export const PROFILE_CHANGE_SHOW_NAME = "PROFILE::CHANGE_SHOW_NAME";
export const PROFILE_CHANGE_NAME = "PROFILE::CHANGE_NAME";

export const profileChangeShowName = (showName) => ({
  type: PROFILE_CHANGE_SHOW_NAME,
  payload: {
    showName,
  },
});

export const profileChangeName = (name) => ({
  type: PROFILE_CHANGE_NAME,
  payload: {
    name,
  },
});