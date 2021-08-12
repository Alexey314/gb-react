import { call, put, takeLatest } from "redux-saga/effects";
import { WEATHER_API_URL } from "../../config";
import {
  setErrorStatus,
  setIdleStatus,
  setLoadingStatus,
  setWeatherInfo,
  START_REQUEST,
} from "./weatherActions";

export const fetchWeather = (url) =>
  fetch(url).then((response) => {
    if (!response.ok || response.status !== 200) {
      throw Error("Can't get weather info!");
    }
    return response.json();
  });

function* handleRequest(action) {
  try {
    yield put(setLoadingStatus());
    const result = yield call(fetchWeather, WEATHER_API_URL);
    console.log({ result });
    yield put(setWeatherInfo(result));
    yield put(setIdleStatus());
  } catch (e) {
    yield put(setErrorStatus());
  }
}

function* watchStartRequest() {
  yield takeLatest(START_REQUEST, handleRequest);
}

export { watchStartRequest };
