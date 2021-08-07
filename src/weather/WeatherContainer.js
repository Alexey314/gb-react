import Weather from "./Weather";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRequest } from "./state/weatherActions";
import { IconButton } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

export default function WeatherContainer() {
  const dispatch = useDispatch();
  const { info, status } = useSelector((state) => state.weather);
  useEffect(() => dispatch(startRequest()), [dispatch]);

  return (
    <>
      <IconButton onClick={() => dispatch(startRequest())} aria-label="reload">
        <RefreshIcon />
      </IconButton>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Data load error</p>
      ) : (
        <Weather info={info} />
      )}
    </>
  );
}
