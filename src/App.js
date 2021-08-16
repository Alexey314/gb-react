import "./App.css";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
// import Profile from "./profile/Profile";
// import ChatsViewContainer from "./chat/ChatsViewContainer";
// import WeatherContainer from "./weather/WeatherContainer";
import PrivateRoute from "./hocs/PrivateRoute";
import { Suspense, lazy, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
// import { Login } from "./login/Login";
// import { Signup } from "./signup/Signup";

const Profile = lazy(() => import("./profile/Profile"));
const ChatsViewContainer = lazy(() => import("./chat/ChatsViewContainer"));
const WeatherContainer = lazy(() => import("./weather/WeatherContainer"));
const Login = lazy(() => import("./login/Login"));
const Signup = lazy(() => import("./signup/Signup"));

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

function ListItemLink({ to, text }) {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemText
        primary={text}
        primaryTypographyProps={{ align: "center" }}
      />
    </ListItem>
  );
}

function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <header>
          <h1>Messenger App</h1>
          <nav>
            <List style={flexContainer}>
              <ListItem>
                <ListItemLink to="/" text="Home" />
              </ListItem>
              <ListItem>
                <ListItemLink to="/chats" text="Chats" />
              </ListItem>
              <ListItem>
                <ListItemLink to="/weather" text="Weather" />
              </ListItem>
              <ListItem>
                <ListItemLink to="/profile" text="Profile" />
              </ListItem>
            </List>
          </nav>
        </header>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route exact path="/">
              <p>Home page</p>
            </Route>
            <Route exact path="/weather" component={WeatherContainer} />
            <PrivateRoute
              authenticated={authed}
              exact
              path="/profile"
              component={Profile}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute
              authenticated={authed}
              path="/chats/:chatId?"
              component={ChatsViewContainer}
            />
            <Route>
              <p>404 Page not found</p>
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
