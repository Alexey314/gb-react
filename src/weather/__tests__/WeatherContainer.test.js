// import { useSelector, useDispatch, Provider } from "react-redux";
import * as ReactRedux from 'react-redux'
import WeatherContainer from "../WeatherContainer";
import ShallowRenderer from "react-test-renderer/shallow";
import configureStore from "redux-mock-store";
import weatherReducer from "../state/weatherReducer";
import { combineReducers, createStore } from "redux";
import { render } from "@testing-library/react";
import { startRequest } from '../state/weatherActions';

describe("WeatherContainer", () => {
  it("should dispatch startRequest action", () => {
    const rootReducer = combineReducers({
      weather: weatherReducer,
    });
    const store = createStore(rootReducer);

    const useDispatchSpy = jest.spyOn(ReactRedux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const component = render(
      <ReactRedux.Provider store={store}>
        <WeatherContainer />
      </ReactRedux.Provider>
    );

    expect(mockDispatchFn).toHaveBeenCalledWith(startRequest())
  });
});
