import { useDispatch, useSelector } from "react-redux";
import {
  profileChangeShowName,
  profileChangeName,
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
import "firebase/auth";

function Profile(props) {
  const dispatch = useDispatch();
  const { name, showName } = useSelector(selectProfile);
  const handleNameChange = (event) => {
    dispatch(profileChangeName(event.target.value));
  };
  const handleShowNameChange = (event) => {
    dispatch(profileChangeShowName(event.target.checked));
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
                checked={showName}
                onChange={handleShowNameChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Show name"
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
