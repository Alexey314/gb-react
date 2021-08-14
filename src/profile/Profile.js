import { useDispatch, useSelector } from "react-redux";
import {
  profileChangeIsOnlineWithFirebase,
  profileChangeNameWithFirebase,
  profileInitTrackingWithFirebase,
} from "./state/profileActions";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
} from "@material-ui/core";
import { selectProfile } from "../store/profileReducer/selectors";
import firebase from "firebase/app";
import "firebase/database";
import { useEffect } from "react";

function Profile() {
  const dispatch = useDispatch();
  const { name, isOnline } = useSelector(selectProfile);

  useEffect(() => {
    dispatch(profileInitTrackingWithFirebase());
  }, [dispatch]);

  const handleNameChange = (event) => {
    dispatch(profileChangeNameWithFirebase(event.target.value));
  };
  const handleIsOnlineChange = (event) => {
    dispatch(profileChangeIsOnlineWithFirebase(event.target.checked));
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        alignContent="center"
      >
        <Grid item>
          <TextField
            id="filled-name"
            label="Name"
            value={name}
            onChange={handleNameChange}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOnline || false}
                onChange={handleIsOnlineChange}
                name="isOnlineCB"
                color="primary"
              />
            }
            label="Is online"
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
