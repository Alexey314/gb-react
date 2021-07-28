import {
  PROFILE_CHANGE_SHOW_NAME,
  PROFILE_CHANGE_NAME,
} from "./profileActions";

const initialState = {
  showName: true,
  name: "Bob",
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_CHANGE_SHOW_NAME:
      return {
        ...state,
        showName: action.payload.showName,
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
