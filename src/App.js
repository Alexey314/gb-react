import "./App.css";
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./profile/Profile";
import ChatsViewContainer from "./chat/ChatsViewContainer";

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
  return (
    <div className="App">
      <Container maxWidth="sm">
        <header>
          <h1>Messenger App</h1>
          <nav>
            <List style={flexContainer}>
              <ListItemLink to="/" text="Home" />
              <ListItemLink to="/chats" text="Chats" />
              <ListItemLink to="/profile" text="Profile" />
            </List>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <p>Home page</p>
          </Route>
          <Route exact path="/profile" component={Profile} />
          <Route path="/chats/:chatId?" component={ChatsViewContainer} />
          <Route>
            <p>404 Page not found</p>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
