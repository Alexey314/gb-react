export const START_REQUEST = "WEATHER::START_REQUEST";
export const SET_LOADING_STATUS = "WEATHER::SET_LOADING_STATUS";
export const SET_ERROR_STATUS = "WEATHER::SET_ERROR_STATUS";
export const SET_IDLE_STATUS = "WEATHER::SET_IDLE_STATUS";
export const SET_WEATHER_INFO = "WEATHER::SET_WEATHER_INFO";

export const startRequest = () => ({ type: START_REQUEST });
export const setLoadingStatus = () => ({ type: SET_LOADING_STATUS });
export const setErrorStatus = () => ({ type: SET_ERROR_STATUS });
export const setIdleStatus = () => ({ type: SET_IDLE_STATUS });
export const setWeatherInfo = (info) => ({
  type: SET_WEATHER_INFO,
  payload: {
    info,
  },
});
