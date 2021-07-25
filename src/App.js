import "./App.css";
import { Container, List, ListItem } from "@material-ui/core";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import ChatsView from "./ChatsView";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <header>
          <h1>Messenger App</h1>
          <nav>
            <List>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>
              <ListItem>
                <Link to="/chats">Chats</Link>
              </ListItem>
              <ListItem>
                <Link to="/profile">Profile</Link>
              </ListItem>
            </List>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            {<p>Home page</p>}
          </Route>
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/chats" component={ChatsView} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
