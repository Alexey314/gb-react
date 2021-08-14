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
import "firebase/database";
import { useEffect, useState } from "react";


function Profile(props) {
  const dispatch = useDispatch();
  // const { name, isOnline } = useSelector(selectProfile);
  const [ name, setName] = useState("");
  const [ isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    firebase
      .database()
      .ref("profile")
      .child(user.uid)
      .on("value", (snapshot) => {
        const {name = "unnamed", isOnline = true} = snapshot.val();
        setName(()=>String(name));
        setIsOnline(()=>isOnline);
      });
  }, []);

  const handleNameChange = (event) => {
    // dispatch(profileChangeName(event.target.value));
    const user = firebase.auth().currentUser;
    // console.log("user = ", user);
    firebase
      .database()
      .ref("profile")
      .child(user.uid)
      .child("name")
      .set(event.target.value);
  };
  const handleIsOnlineChange = (event) => {
    // dispatch(profileChangeShowName(event.target.checked));
    const user = firebase.auth().currentUser;
    // console.log("user = ", user);
    firebase
      .database()
      .ref("profile")
      .child(user.uid)
      .child("isOnline")
      .set(event.target.checked);
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
                checked={isOnline}
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
