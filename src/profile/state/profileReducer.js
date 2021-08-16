import {
  PROFILE_CHANGE_IS_ONLINE,
  PROFILE_CHANGE_NAME,
} from "./profileActions";

const initialState = {
  isOnline: true,
  name: "Bob",
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_CHANGE_IS_ONLINE:
      return {
        ...state,
        isOnline: action.payload.isOnline,
      };
    case PROFILE_CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
}
