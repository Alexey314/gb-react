import {
  SET_LOADING_STATUS,
  SET_ERROR_STATUS,
  SET_IDLE_STATUS,
  SET_WEATHER_INFO,
} from "./weatherActions";

const initialState = {
  status: "idle",
  info: {},
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        status: "loading",
      };
    case SET_ERROR_STATUS:
      return {
        ...state,
        status: "error",
      };
    case SET_IDLE_STATUS:
      return {
        ...state,
        status: "idle",
      };
    case SET_WEATHER_INFO:
      return {
        ...state,
        info: action.payload.info,
      };
    default:
      return state;
  }
}
